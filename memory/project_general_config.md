---
name: project-general-config
description: Tool stack, hosting, and credential management for the Nahuel Beade portfolio project
metadata:
  type: project
  date: 2026-06-20
---

# General Project Configuration

| Tool | Purpose |
|------|---------|
| Next.js | Frontend framework |
| TypeScript | Language |
| Tailwind CSS | Styling |
| Vercel | Hosting / deployment |
| WordPress (on Hostinger) | Headless CMS / content backend |
| Hostinger | Domain, DNS, WordPress host |
| GitHub | Code repository |
| Bitwarden | Password manager |

## WordPress

- REST API base: `https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2`
- Temporary domain: `lightcyan-deer-205982.hostingersite.com`
- Production domain: `nahuelbeade.com`
- Admin email: `nah.beade@gmail.com`
- WP Admin access: Hostinger hPanel → site nahuelbeade.com → WordPress Admin

**Why:** WordPress is used as a headless CMS; Next.js fetches content via the REST API at build/request time.  
**How to apply:** Always use the REST API URL constant in `lib/wordpress.ts`. Never hardcode the domain elsewhere.

## Credentials

Store all secrets (WP admin password, API keys, etc.) in **Bitwarden**. Do not commit secrets to the repository.

**Why:** Secrets in git history are permanent and cannot be fully revoked.  
**How to apply:** Use `.env.local` for local dev (git-ignored), Vercel environment variables for production. If a secret is needed, ask the user to retrieve it from Bitwarden.
