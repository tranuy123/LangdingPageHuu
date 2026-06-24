# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # start Next.js dev server

# Build
npm run build        # prisma generate + next build (standalone output)

# Linting
npm run lint         # next lint

# Database
npm run db:push      # push schema changes to DB (prisma db push)
npm run db:seed      # seed initial content (tsx prisma/seed.ts)
```

Copy `.env.example` to `.env` and set `DATABASE_URL` before running locally.

To run with Docker (includes Postgres, migration, and app):
```bash
docker compose up
```
The compose file runs `db:push` + `db:seed` automatically via the `migrate` service before starting the app.

## Architecture

This is a **Next.js 14 App Router** landing page for a Vietnamese cinematic post-production academy ("Học Viện Hậu Kỳ Cinematic"), backed by **PostgreSQL via Prisma**.

### Data flow

The root page (`src/app/page.tsx`) is a server component that fetches all data in a single `Promise.all` from Prisma, then passes it down as props to each section component. It is marked `force-dynamic` so every request hits the DB.

All content is stored in the database and editable via the admin panel at `/admin`. The admin page is also a server component that fetches initial data and passes it to `AdminClient` (a client component). `AdminClient` uses tabbed forms that POST to `/api/admin/<section>` routes, each of which upserts records via Prisma.

### Key schema patterns

- `SiteConfig` — key/value store for hero text, site name, and CTA labels. Keys: `hero_title`, `hero_subtitle`, `hero_cta_primary`, `hero_cta_secondary`, `site_name`.
- `Course.modules` — stored as a JSON string (array of module names); must be `JSON.parse`/`JSON.stringify`'d in application code.
- All list models (`Course`, `Project`, `Feature`) have an `order` field used for display ordering.

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json`).

### Singleton Prisma client

`src/lib/prisma.ts` uses the global singleton pattern to prevent multiple PrismaClient instances during hot reload in development.

### Images

`next.config.ts` allows remote images from `img.youtube.com` and local pattern `/uploads/**`. Uploaded files are saved to `public/uploads/` (mounted as a Docker named volume `uploads` so files persist across redeploys).

### Admin security

`src/middleware.ts` protects all `/admin/*` and `/api/admin/*` routes. Requires `admin_session` cookie matching `process.env.ADMIN_SECRET`. Login via `/admin/login` page using `ADMIN_PASSWORD` env var. Env vars `ADMIN_PASSWORD` and `ADMIN_SECRET` must be set (see `.env.example`).

---

## Quy Tắc Làm Việc

Dự án này dùng **CHECKLIST.md** để theo dõi tiến độ. Quy tắc bắt buộc:

- Mọi công việc đều phải có trong `CHECKLIST.md` trước khi thực hiện
- Khi có yêu cầu mới → **bổ sung vào CHECKLIST.md trước**, rồi mới làm
- Khi hoàn thành task → **tick `[x]` trong CHECKLIST.md ngay**
- Thực hiện tuần tự theo thứ tự trong checklist, không bỏ qua
- Mở session mới → đọc `CHECKLIST.md` để nắm trạng thái hiện tại
