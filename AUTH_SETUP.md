# Fitnessandi Auth Setup Guide

## Local Development Setup

### Prerequisites
- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- Neon PostgreSQL database (already set up with table)
- `.env.local` file with `DATABASE_URL` and `JWT_SECRET`

### Running Locally

**Option 1: With Backend (Recommended for testing auth)**
```bash
npm run dev:api
```
This starts both Vite frontend (http://localhost:5173) and Vercel serverless API (http://localhost:3000).

**Option 2: Frontend only**
```bash
npm run dev
```
This starts only Vite on http://localhost:5173. Auth will fail with error: "API Error — run 'vercel dev' to start the backend"

### Testing the Auth Flow

1. Start the dev server:
   ```bash
   npm run dev:api
   ```

2. Go to http://localhost:5173

3. Click "Sign In" or navigate to /register

4. Create a new account:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`

5. Complete the 4-step onboarding

6. You'll be redirected to /dashboard

7. Click avatar (top right) → Profile to see your data

8. Refresh the page — you stay logged in (JWT verified server-side)

9. Click avatar → Sign Out

### Database Schema

The `users` table is automatically created in your Neon database:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  profile JSONB DEFAULT '{"goal":null,"stats":{},"activityLevel":null,"diet":null}',
  is_onboarded BOOLEAN DEFAULT false
);
```

### Environment Variables

Required in `.env.local`:

```
DATABASE_URL=postgresql://neondb_owner:npg_mgGOvb6kC4DA@ep-late-queen-aqofl1hk-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=fitnessandi-dev-secret-key-2026
```

### Production (Vercel)

1. Add env vars to Vercel dashboard:
   - Settings → Environment Variables
   - Add `DATABASE_URL` and `JWT_SECRET`

2. Deploy:
   ```bash
   git push
   ```

3. Vercel auto-deploys with both frontend + API

4. Test at your deployed URL

### Troubleshooting

**"API Error — run 'vercel dev' to start the backend"**
- You're running `npm run dev` instead of `npm run dev:api`
- Stop the current process and run `npm run dev:api`

**"Invalid email or password"**
- Email doesn't exist in database
- Password is incorrect
- Check Neon console to see registered users

**"Email already registered"**
- This email is already in the database
- Try a different email

**"Invalid or expired token"**
- Token is older than 7 days
- Session expired, try logging in again

### API Endpoints

All require `.env.local` `DATABASE_URL` and `JWT_SECRET`:

| Endpoint | Method | Auth | Body | Returns |
|---|---|---|---|---|
| `/api/auth/register` | POST | — | `{ name, email, password }` | `{ token, user }` |
| `/api/auth/login` | POST | — | `{ email, password }` | `{ token, user }` |
| `/api/auth/me` | GET | Bearer token | — | `{ user }` |
| `/api/auth/profile` | PUT | Bearer token | `{ profile }` | `{ user }` |

