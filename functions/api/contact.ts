// Cloudflare Pages Function — handles POST /api/contact
// Sends the contact-form submission to the team via Resend (https://resend.com).
// Deploys automatically on Cloudflare Pages (no Astro adapter needed; site stays static).
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY  — your Resend API key (secret)
//
// Optional D1 binding (Cloudflare Pages → Settings → Bindings):
//   DB  — D1 database `ductmasters-enquiries` (schema: migrations/0001_create_enquiries.sql).
//   Every valid submission is saved before the email is sent, so enquiries are
//   kept even if email delivery fails. View them in Cloudflare → D1 → Console.
//
// The "from" domain must be verified in Resend. We send from gnext.space (verified).

// Minimal D1 types (avoids a @cloudflare/workers-types dependency)
interface D1Result { meta?: { last_row_id?: number } }
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
}
interface D1Database { prepare(query: string): D1PreparedStatement }

interface Env {
  RESEND_API_KEY?: string;
  DB?: D1Database;
}

const RECIPIENTS = ['gm@ductmasters.ae', 'md@ductmasters.ae', 'info@ductmasters.ae'];
const FROM = 'Duct Masters Website <noreply@gnext.space>';

// In-memory rate limiter — 5 submissions per IP per 60 seconds
const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const ipWindows = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipWindows.get(ip);
  if (!entry || now > entry.resetAt) {
    ipWindows.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}


function cleanupStale(): void {
  const now = Date.now();
  for (const [ip, entry] of ipWindows) {
    if (now > entry.resetAt) ipWindows.delete(ip);
  }
}

// Max characters per field — matches the maxlength attributes on /contact/
const LIMITS: Record<string, number> = {
  name: 100,
  email: 254,
  phone: 30,
  company: 150,
  service: 100,
  message: 5000,
};

/** Only accept posts from this site (same host), e.g. not from a form on another domain. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // non-browser clients; still rate limited and validated
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}

/** Save the enquiry; returns its row id, or null if storage is unavailable. Never throws. */
async function saveEnquiry(db: D1Database | undefined, e: Record<string, string>): Promise<number | null> {
  if (!db) return null;
  try {
    const res = await db
      .prepare(
        'INSERT INTO enquiries (name, email, phone, company, service, message, page, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(e.name, e.email, e.phone || null, e.company || null, e.service || null, e.message, e.page || null, e.country || null)
      .run();
    return res.meta?.last_row_id ?? null;
  } catch {
    return null;
  }
}

async function setEmailStatus(db: D1Database | undefined, id: number | null, status: string): Promise<void> {
  if (!db || id === null) return;
  try {
    await db.prepare('UPDATE enquiries SET email_status = ? WHERE id = ?').bind(status, id).run();
  } catch {
    /* storage problems must not affect the visitor */
  }
}

/** Path of the page the form was sent from (Referer), same site only. */
function sourcePage(request: Request): string {
  try {
    const ref = new URL(request.headers.get('Referer') ?? '');
    return ref.host === new URL(request.url).host ? ref.pathname.slice(0, 200) : '';
  } catch {
    return '';
  }
}

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = context;
  try {
    // Rate limit check
    if (!isSameOrigin(request)) {
      return json({ ok: false, error: 'Forbidden.' }, 403);
    }

    const ip = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    cleanupStale();
    if (!checkRateLimit(ip)) {
      return json({ ok: false, error: 'Too many requests. Please wait a moment before trying again.' }, 429);
    }

    const form = await request.formData();
    const get = (k: string) => String(form.get(k) ?? '').trim();

    // Honeypot — silently accept bots without sending
    if (get('_gotcha')) return json({ ok: true });

    const name = get('name');
    const email = get('email');
    const phone = get('phone');
    const company = get('company');
    const service = get('service');
    const message = get('message');

    for (const [field, max] of Object.entries(LIMITS)) {
      if (get(field).length > max) {
        return json({ ok: false, error: `The ${field} field is too long (max ${max} characters).` }, 400);
      }
    }

    if (!name || !email || !message) {
      return json({ ok: false, error: 'Please fill in your name, email, and project details.' }, 400);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
    }
    // Save first, so the enquiry survives an email failure
    const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? '';
    const enquiryId = await saveEnquiry(env.DB, {
      name, email, phone, company, service, message, page: sourcePage(request), country,
    });

    if (!env.RESEND_API_KEY) {
      await setEmailStatus(env.DB, enquiryId, 'not_configured');
      // Stored but not emailed — still tell the visitor it was received if we saved it
      if (enquiryId !== null) return json({ ok: true });
      return json({ ok: false, error: 'Email service is not configured yet. Please call or WhatsApp us.' }, 500);
    }

    const rows: [string, string][] = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone || '—'],
      ['Company', company || '—'],
      ['Service', service || '—'],
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1c1917">
        <div style="background:#112336;padding:20px 24px;border-radius:12px 12px 0 0">
          <h2 style="margin:0;color:#fff;font-size:18px">New Website Inquiry</h2>
          <p style="margin:4px 0 0;color:#81B5E3;font-size:13px">ductmasters.ae contact form</p>
        </div>
        <div style="border:1px solid #e7e5e4;border-top:0;border-radius:0 0 12px 12px;padding:24px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px 0;color:#78716c;width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:600">${esc(v)}</td></tr>`
              )
              .join('')}
          </table>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e7e5e4">
            <p style="margin:0 0 6px;color:#78716c;font-size:13px">Project details</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.6">${esc(message)}</p>
          </div>
        </div>
      </div>`;

    const text =
      `New Website Inquiry — ductmasters.ae\n\n` +
      rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
      `\n\nProject details:\n${message}\n`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        reply_to: email,
        // Strip line breaks so user input cannot add lines to the subject
        subject: `New inquiry from ${name}${service ? ` — ${service}` : ''}`.replace(/[\r\n]+/g, ' '),
        html,
        text,
      }),
    }).catch(() => null); // network failure → treated like a failed send

    const sent = !!res?.ok;
    await setEmailStatus(env.DB, enquiryId, sent ? 'sent' : 'failed');

    if (!sent) {
      // The enquiry is stored, so the team can still follow it up
      if (enquiryId !== null) return json({ ok: true });
      return json(
        { ok: false, error: 'Sorry, we could not send your message right now. Please call or WhatsApp us.' },
        502
      );
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'Something went wrong. Please try again.' }, 500);
  }
};
