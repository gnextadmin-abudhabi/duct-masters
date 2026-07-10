// Cloudflare Pages Function — handles POST /api/contact
// Sends the contact-form submission to the team via Resend (https://resend.com).
// Deploys automatically on Cloudflare Pages (no Astro adapter needed; site stays static).
//
// Required env var (Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY  — your Resend API key (secret)
//
// The "from" domain must be verified in Resend. We send from gnext.space (verified).

interface Env {
  RESEND_API_KEY?: string;
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

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = context;
  try {
    // Rate limit check
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

    if (!name || !email || !message) {
      return json({ ok: false, error: 'Please fill in your name, email, and project details.' }, 400);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
    }
    if (!env.RESEND_API_KEY) {
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
        subject: `New inquiry from ${name}${service ? ` — ${service}` : ''}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
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
