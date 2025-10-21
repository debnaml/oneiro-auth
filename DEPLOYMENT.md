# Deployment Checklist

## Before Deployment

- [ ] Update `.env.local` with your Supabase credentials
- [ ] Test locally with `npm run dev`
- [ ] Commit all changes to git
- [ ] Push repository to GitHub

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/your-username/oneiro-auth.git
   ```
3. Push the code:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Set Framework Preset to "Next.js"
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

## Supabase Configuration (IMPORTANT!)

After successful deployment, configure your Supabase project:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to Authentication > URL Configuration
4. Update the following:
   - **Site URL**: `https://your-app-name.vercel.app`
   - **Redirect URLs**: Add these URLs:
     - `https://your-app-name.vercel.app/reset-password`
     - `https://your-app-name.vercel.app/verify`

## Testing

- [ ] Test email verification flow
- [ ] Test password reset flow
- [ ] Verify all redirects work correctly
- [ ] Check that environment variables are loaded

## Post-Deployment

- [ ] Update your main Oneiro app with the new auth portal URL
- [ ] Test the complete auth flow from your main app
- [ ] Monitor Vercel deployment logs for any issues
