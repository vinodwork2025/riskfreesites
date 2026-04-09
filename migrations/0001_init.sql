-- Risk Free Sites — D1 database schema
-- Run: npm run db:migrate  (local)  or  npm run db:migrate:remote  (production)

CREATE TABLE IF NOT EXISTS leads (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email        TEXT NOT NULL,
  industry     TEXT NOT NULL,
  website      TEXT,
  status       TEXT NOT NULL DEFAULT 'new',  -- new | demo_generated | contacted
  demo_url     TEXT,
  demo_slug    TEXT UNIQUE,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_demo_slug  ON leads(demo_slug);
