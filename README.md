# Oneiro Auth Portal

A minimal Next.js web companion for the Oneiro app that handles Supabase email verification and password resets.

> 🚀 Ready for deployment to Vercel

## Features

- **Email Verification**: `/verify` - Handles email verification tokens from Supabase
- **Password Reset**: `/reset-password` - Secure password reset flow
- **Landing Page**: `/` - Simple portal information page

## Setup

### Local Development

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your Supabase project details:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Install dependencies and run locally:
   ```bash
   npm install
   npm run dev
   ```

4. Visit `http://localhost:3000` to see the portal

### Deploy to Vercel

1. Push this repository to GitHub
2. Connect the repository to Vercel
3. Set the following environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Configure Supabase

After deployment, update your Supabase project settings:

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Set "Site URL" = `https://your-vercel-domain.vercel.app`
3. Add redirect URLs:
   - Password reset: `https://your-vercel-domain.vercel.app/reset-password`
   - Email verification: `https://your-vercel-domain.vercel.app/verify`

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Supabase** - Authentication backend
- **Tailwind CSS** - Styling
- **Vercel** - Deployment platform

## Project Structure

```
├── app/
│   ├── page.js              # Landing page
│   ├── verify/page.js       # Email verification handler
│   ├── reset-password/page.js # Password reset form
│   └── globals.css         # Global styles
├── lib/
│   └── supabase.js         # Supabase client configuration
├── .env.local.example      # Environment variables template
└── vercel.json            # Vercel deployment configuration
```
