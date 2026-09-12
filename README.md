# Shifaref

Live at **[shifaref.vercel.app](https://shifaref.vercel.app)**

A wellness and health e-commerce platform: a storefront for natural supplements paired with a small medical blog, built to be server-rendered so both product pages and blog content are actually reachable through organic search — not locked behind client-side rendering.

## What's in it

- **Server-rendered storefront + blog** on Next.js App Router, built for organic search reach.
- **Admin dashboard** (Prisma + Supabase Postgres) where the admin uploads products and drafts blog posts directly — a tagged/categorized CMS with read-time estimation.
- **Role-based access control** for admins vs. content managers, via NextAuth with a Prisma adapter.
- **Customer messaging portal** with read/unread tracking and status search.

## Stack

Next.js (App Router) · React · TypeScript · Prisma · Supabase (Postgres) · NextAuth · Tailwind CSS · Radix UI · React Hook Form + Zod

## Getting started

```bash
npm install
npx prisma generate
npm run dev
```

Requires a `DATABASE_URL` and Supabase credentials in `.env.local` (not committed — see `prisma/schema.prisma` and `next-auth` config for the expected environment variables).

```bash
npm run build   # runs prisma generate + migrate deploy, then builds
npm run start
npm run lint
```

## Deployment

Deployed on [Vercel](https://vercel.com).
