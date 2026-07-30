# DevPortfolioX — Full Stack Engineer Portfolio

A production-grade, **database-driven portfolio** for a Full Stack Engineer specialized in **Angular / TypeScript** on the frontend and **Java / Spring Boot / PostgreSQL** on the backend.

Everything below the hero — projects, skills, experience timeline, and the contact inbox — is served from a live **REST API backed by PostgreSQL**. The contact form validates on both client and server and persists messages to the database. The site ships in **English, Arabic (RTL), Russian, and French**, with dark/light modes and a fully responsive layout.

---

## Tech Stack

### Frontend
| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) — React 19, TypeScript |
| Styling | Tailwind CSS v4, custom design tokens |
| Motion | Framer Motion (scroll reveals, modals, marquee) |
| Icons | Real brand icons (Simple Icons path data) + Lucide |
| i18n | Custom provider — EN / AR (RTL) / RU / FR, persisted in `localStorage` |
| Theming | Class-based dark/light mode, persisted |

### Backend (API layer)
| Layer | Implementation |
|---|---|
| Controllers | Route handlers under `src/app/api/**` |
| Validation (DTO) | Zod schemas in `src/lib/validators.ts` |
| Repository | Drizzle ORM (`src/db`, `src/lib/data.ts`) |
| Entities | `src/db/schema.ts` |
| Errors | Consistent `{ data }` / `{ error, fields }` envelopes |
| Auth | Optional `x-admin-key` guard on mutating endpoints |

### Database
PostgreSQL with four relational tables: `projects`, `skills`, `experience`, `contact_messages`. Translatable content is stored in typed `jsonb` translation maps so a single row serves all four languages.

---

## Features

- **Hero** — animated gradient composition, architecture code windows (Spring Boot controller + Angular service), real tech-icon marquee
- **About** — engineering pillars (frontend, backend, database, API & security) with layered-architecture visual
- **Skills** — 20 skills in 4 categories with real brand icons and animated proficiency bars (from PostgreSQL)
- **Projects** — 4 full case studies: problem, solution, backend architecture, features, key achievement, stack; case-study modal, GitHub/live links (from PostgreSQL)
- **Experience** — animated timeline (from PostgreSQL)
- **Contact** — reactive form: per-field validation, loading and success states; messages persisted via `POST /api/contact` and readable via the admin inbox endpoint
- **Resume** — `GET /api/resume` generates a real PDF server-side (no dependencies)
- **i18n** — full UI translation EN / AR / RU / FR, automatic `dir="rtl"` for Arabic, locale-aware fonts, remembered preference
- **Responsive** — mobile hamburger menu, adaptive grids (1 → 2 → 4 columns), no horizontal scrolling, touch-friendly forms

## Screenshots

_Add screenshots of the hero, projects grid, case-study modal, and Arabic RTL mode here._

```
docs/screenshots/hero.png
docs/screenshots/projects.png
docs/screenshots/case-study.png
docs/screenshots/rtl-arabic.png
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `ADMIN_API_KEY` | no | When set, mutating endpoints + message inbox require the `x-admin-key` header |
| `NEXT_PUBLIC_API_URL` | no | API base URL for the browser client (defaults to same origin) |

### 3. Create the schema

```bash
npx drizzle-kit push
```

### 4. Seed content

```bash
npx tsx src/db/seed.ts
```

### 5. Run

```bash
npm run dev        # development
npm run build      # production build
npm run start      # production server
```

Open http://localhost:3000.

---

## API Documentation

Base URL: `/api`. Responses use a consistent envelope: `{ "data": … }` on success, `{ "error": "…", "fields"?: {…} }` on failure.

### Projects

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/projects` | public | List all projects |
| `GET` | `/api/projects/{id}` | public | Single project |
| `POST` | `/api/projects` | admin | Create a project |
| `PUT` | `/api/projects/{id}` | admin | Update a project |
| `DELETE` | `/api/projects/{id}` | admin | Delete a project (returns `{ deleted: id }`) |

Example create body:

```json
{
  "title": "Enterprise E-Commerce Platform",
  "slug": "enterprise-ecommerce-platform",
  "shortDescription": "…",
  "fullDescription": "…",
  "problem": "…",
  "solution": "…",
  "architecture": "…",
  "features": ["JWT authentication", "…"],
  "techStack": ["Angular", "Spring Boot", "PostgreSQL"],
  "githubUrl": "https://github.com/…",
  "liveUrl": "https://…",
  "imageUrl": "/images/projects/ecommerce.jpg",
  "featured": true,
  "displayOrder": 1,
  "translations": { "ar": { "title": "…" }, "ru": {}, "fr": {} }
}
```

### Skills

| Method | Endpoint | Access |
|---|---|---|
| `GET` | `/api/skills` | public |
| `GET` | `/api/skills/{id}` | public |
| `POST` | `/api/skills` | admin |
| `PUT` | `/api/skills/{id}` | admin |
| `DELETE` | `/api/skills/{id}` | admin |

`category` is one of `frontend | backend | database | tools`; `proficiency` is 0–100.

### Experience

| Method | Endpoint | Access |
|---|---|---|
| `GET` | `/api/experience` | public |
| `GET` | `/api/experience/{id}` | public |
| `POST` | `/api/experience` | admin |
| `PUT` | `/api/experience/{id}` | admin |
| `DELETE` | `/api/experience/{id}` | admin |

### Contact

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/contact` | public | Validate + persist a contact message → `201` |
| `GET` | `/api/contact/messages` | admin | Inbox, newest first |

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Hello, I would like to discuss a role with you."
}
```

### Admin access

When `ADMIN_API_KEY` is configured:

```bash
curl -X POST http://localhost:3000/api/skills \
  -H "Content-Type: application/json" \
  -H "x-admin-key: $ADMIN_API_KEY" \
  -d '{"name":"Kubernetes","category":"tools","iconName":"kubernetes","proficiency":70}'
```

### Resume & Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/resume` | Server-generated resume PDF (download) |
| `GET` | `/api/health` | Liveness probe (`{ "ok": true }`) |

---

## Project Structure

```
src/
├── app/
│   ├── api/                    # REST controllers
│   │   ├── projects/           # GET|POST  +  [id]: GET|PUT|DELETE
│   │   ├── skills/             # GET|POST  +  [id]: GET|PUT|DELETE
│   │   ├── experience/         # GET|POST  +  [id]: GET|PUT|DELETE
│   │   ├── contact/            # POST      +  messages: GET (admin)
│   │   ├── resume/             # GET — generated PDF
│   │   └── health/             # GET — liveness
│   ├── layout.tsx              # providers, fonts, metadata
│   ├── page.tsx                # composes sections from repository data
│   └── globals.css             # design tokens, keyframes, RTL fonts
├── components/
│   ├── layout/                 # navbar (lang switcher, theme, mobile menu), footer
│   ├── providers/              # i18n (EN/AR/RU/FR + RTL), theme
│   ├── sections/               # hero, about, skills, projects, experience, contact
│   └── ui/                     # tech-icon, section-heading, reveal
├── db/
│   ├── schema.ts               # entities: projects, skills, experience, contact_messages
│   ├── index.ts                # connection pool / Drizzle client
│   └── seed.ts                 # idempotent seed with 4-locale content
├── i18n/                       # en.json, ar.json, ru.json, fr.json
└── lib/
    ├── validators.ts           # Zod DTOs + field-error flattening
    ├── api-utils.ts            # response envelopes, admin guard, helpers
    ├── data.ts                 # server repository layer
    ├── api-client.ts           # browser HTTP service (contact form)
    ├── localize.ts             # per-locale field resolution
    └── brand-icons.json        # real brand SVG paths (Simple Icons)
```

## Database Schema

**projects** — `id, title, slug (unique), short_description, full_description, problem, solution, architecture, features[], tech_stack[], github_url, live_url, image_url, featured, display_order, translations (jsonb), created_at, updated_at`

**skills** — `id, name, category, icon_name, proficiency, display_order, created_at`

**experience** — `id, role, company, period, description, technologies[], display_order, translations (jsonb), created_at`

**contact_messages** — `id, name, email, subject, message, status (new|read|replied), created_at`

---

## Deployment

### Docker (app + PostgreSQL)

```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/app_db
      ADMIN_API_KEY: change-me
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app_db
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes:
  pgdata:
```

### Any Node host (Render / Railway / VPS)

1. Provision a managed PostgreSQL instance and set `DATABASE_URL`.
2. `npm ci && npm run build`
3. `npx drizzle-kit push && npx tsx src/db/seed.ts` (first deploy only)
4. `npm run start`

The app is server-rendered and only requires the single `DATABASE_URL` secret.

## Code Quality

- Strict TypeScript throughout; DTOs validated with Zod on every API boundary
- Layered backend: controller → validation → repository → entity
- Consistent API error envelopes with per-field messages
- No hardcoded URLs or secrets — everything via environment variables
- Graceful degradation: the site renders even before the database is seeded

## Future Improvements

- Admin dashboard UI (the API already supports full CRUD + inbox)
- Email notifications on new contact messages
- Per-project deep-dive pages (`/projects/[slug]`)
- i18n for the full case-study bodies (scaffolding already in place via `translations` JSONB)
- Test suite: API integration tests + component tests

---

© DevPortfolioX — Full Stack Engineer
#   p o r t f o l i o  
 #   m y P o r t f o l i o  
 