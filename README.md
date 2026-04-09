# Risk Free Sites

A high-converting lead generation + demo delivery system. Cold traffic lands, submits a form, and sees a personalised demo website in minutes.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Next.js API routes (Edge Runtime) |
| Database | Cloudflare D1 (SQLite) |
| Hosting | Cloudflare Pages |
| Email | Resend API |

---

## UX Flow

```
Landing page → Form → Loading screen → Demo page (unique URL)
                                          ↓
                                    Email with demo link
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in: RESEND_API_KEY, FROM_EMAIL, ADMIN_SECRET, NEXT_PUBLIC_BASE_URL

# 3. Start dev server
npm run dev
```

> Note: D1 database is Cloudflare-only. In local dev, API routes will error unless you mock the DB.
> For local testing, use `wrangler pages dev` instead (see below).

---

## Cloudflare Deployment

### Step 1 — Create D1 database

```bash
npx wrangler d1 create riskfreesites-db
```

Copy the `database_id` from the output and paste it into `wrangler.toml`.

### Step 2 — Run migrations

```bash
# Local (for testing)
npm run db:migrate

# Production
npm run db:migrate:remote
```

### Step 3 — Set environment variables in Cloudflare Dashboard

Go to **Pages → your project → Settings → Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend key |
| `FROM_EMAIL` | Verified sender address |
| `REPLY_TO_EMAIL` | Your reply-to address |
| `NEXT_PUBLIC_BASE_URL` | `https://yourdomain.com` |
| `ADMIN_SECRET` | A long random string |

### Step 4 — Build and deploy

```bash
npm run pages:build
npm run pages:deploy
```

Or connect your GitHub repo to Cloudflare Pages for automatic deploys.

---

## API Reference

### `POST /api/lead`
Save a new lead.

```json
{
  "name": "Jane Smith",
  "business_name": "Smith Plumbing Co.",
  "email": "jane@smithplumbing.com",
  "industry": "Plumbing",
  "website": "https://smithplumbing.com"  // optional
}
```

Returns: `{ "id": "uuid" }`

---

### `POST /api/generate-demo`
Generate demo content and store it.

```json
{
  "lead_id": "uuid-from-above",
  "business_name": "Smith Plumbing Co.",
  "industry": "Plumbing",
  "name": "Jane Smith",     // for email
  "email": "jane@...",      // for email
  "city": "Austin"          // optional
}
```

Returns: `{ "demo_url": "https://yourdomain.com/demo/smith-plumbing-co-x3k9a", "slug": "smith-plumbing-co-x3k9a" }`

---

### `GET /demo/[slug]`
Renders the personalised demo page.

---

### `GET /api/leads`
Admin endpoint. Requires header: `x-admin-secret: your_secret`.

Returns: `{ "leads": [...] }`

---

## Templates

| Template | Industries |
|----------|-----------|
| Local Service | Plumbing, Electrical, HVAC, Cleaning, Landscaping, etc. |
| Consultant | Marketing, Finance, Legal, IT, Management, etc. |
| Freelancer | Design, Photography, Writing, Development, etc. |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  ← Landing page (all stages)
│   ├── layout.tsx
│   ├── globals.css
│   ├── demo/[slug]/page.tsx      ← Dynamic demo page
│   └── api/
│       ├── lead/route.ts         ← POST /api/lead
│       ├── generate-demo/route.ts ← POST /api/generate-demo
│       └── leads/route.ts        ← GET /api/leads (admin)
├── components/
│   ├── LeadForm.tsx              ← Form modal
│   ├── LoadingScreen.tsx         ← Animated loading stage
│   └── DemoBanner.tsx            ← "This is a demo" banner
├── lib/
│   ├── db.ts                     ← D1 client helper
│   ├── slug.ts                   ← Slug + ID generation
│   ├── demo-generator.ts         ← Content generation engine
│   └── email.ts                  ← Resend integration
├── templates/
│   ├── local-service.ts
│   ├── consultant.ts
│   └── freelancer.ts
migrations/
└── 0001_init.sql                 ← D1 schema
```
