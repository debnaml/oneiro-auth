# Oneiro Auth Portal

A minimal Next.js web companion for the Oneiro app that handles Supabase email verification and password resets.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials.
2. Run locally:

```bash
npm install
npm run dev
```
3. Deploy to Vercel and add the same env vars.

4. In Supabase Dashboard:
   - Set "Site URL" = https://your-vercel-domain.vercel.app
   - Set "Redirect URL" for password resets = https://your-vercel-domain.vercel.app/reset-password
   - Set "Redirect URL" for email verifications = https://your-vercel-domain.vercel.app/verify
