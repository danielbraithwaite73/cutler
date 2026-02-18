# Dino Camp Roster – Backend

Express API server with PostgreSQL (database: **dinocamp**).

## Setup

1. Copy env example and set your DB credentials:

```sh
cp .env.example .env
# Edit .env with your Postgres user/password and optional DATABASE_URL
```

2. Create the database and run schema/seed (from repo root):

```sh
createdb dinocamp
psql -d dinocamp -f db/schema.sql
psql -d dinocamp -f db/seed.sql
```

If the database already existed before `username`/`emoji` were added, run the migration:

```sh
psql -d dinocamp -f db/migrate-add-username-emoji.sql
```

## Run

```sh
cd backend
npm i
npm run dev
```

- **Dev:** `npm run dev` (runs with `--watch` for auto-restart)
- **Prod:** `npm start`

Server runs at **http://localhost:3000** (override with `PORT` env var).

## Endpoints

- `GET /health` – health check (includes DB connection status)
- `GET /api` – example API response
- `GET /api/users` – list users (id, name, username, emoji)
- `PATCH /api/users/:id` – update a user’s username (body: `{ "username": "..." }`)
