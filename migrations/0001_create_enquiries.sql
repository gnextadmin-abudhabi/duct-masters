-- Contact-form submissions (D1 database bound to the Pages project as `DB`).
-- Apply once in Cloudflare: Storage & databases → D1 → ductmasters-enquiries → Console,
-- or: npx wrangler d1 execute ductmasters-enquiries --remote --file=migrations/0001_create_enquiries.sql

CREATE TABLE IF NOT EXISTS enquiries (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  name         TEXT    NOT NULL,
  email        TEXT    NOT NULL,
  phone        TEXT,
  company      TEXT,
  service      TEXT,
  message      TEXT    NOT NULL,
  page         TEXT,            -- path of the page the form was sent from
  country      TEXT,            -- visitor country code from Cloudflare (no IP address stored)
  email_status TEXT    NOT NULL DEFAULT 'pending'  -- pending | sent | failed | not_configured
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries (created_at);
