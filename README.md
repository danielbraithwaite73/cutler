# Dino Discovery Camp Roster

A full-stack camp roster app for managing enrolled campers. View the list of campers and edit their usernames; changes are saved to a PostgreSQL database and persist across sessions.

## Features

- **Camp roster view** — See all enrolled campers with name, username, and emoji.
- **Inline username editing** — Update a camper’s username and save to the database.
- **Persistent data** — Backend stores campers in PostgreSQL so updates survive page refreshes.

## Tech Stack

| Layer    | Stack |
| -------- | ----- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| Backend  | Node.js, Express |
| Database | PostgreSQL |

## Prerequisites

- **Node.js** 18+ and **npm**
- **PostgreSQL** (local or remote instance)
- **Git**

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/dino-camp-roster.git
cd dino-camp-roster
```

### 2. Set up the database

Create the database and run the schema and seed scripts (from the project root):

```bash
createdb dinocamp
psql -d dinocamp -f db/schema.sql
psql -d dinocamp -f db/seed.sql
```

If you already had a `dinocamp` database from an older version without `username`/`emoji` columns, run the migration instead:

```bash
psql -d dinocamp -f db/migrate-add-username-emoji.sql
```

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and set your PostgreSQL credentials. For example:

- **Connection URL:** `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dinocamp`
- **Or separate vars:** `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE=dinocamp`

### 4. Install dependencies and run the backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at **http://localhost:3000**.

### 5. Install dependencies and run the frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:8080** (or the port Vite prints).

### 6. Optional: point the frontend at a different API

If your backend runs on another host or port, create `frontend/.env` and set:

```bash
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
├── backend/           # Express API
│   ├── server.js
│   ├── db.js          # PostgreSQL pool
│   └── .env.example
├── db/                # Database scripts
│   ├── schema.sql     # Table definitions
│   ├── seed.sql       # Seed data
│   └── migrate-add-username-emoji.sql
└── README.md
```

## API Overview

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/health`          | Health check + DB connection   |
| GET    | `/api/users`      | List all users (campers)       |
| PATCH  | `/api/users/:id`  | Update a user’s username       |

## Scripts

**Backend** (`backend/`)

- `npm run dev` — Start with auto-restart
- `npm start` — Start for production

**Frontend** (`frontend/`)

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build
- `npm run preview` — Preview production build

## License

MIT (or your preferred license).
