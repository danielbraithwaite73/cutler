import pg from "pg";

const { Pool } = pg;

function getPoolConfig() {
  if (process.env.DATABASE_URL) {
    return { connectionString: process.env.DATABASE_URL };
  }
  return {
    host: process.env.PGHOST ?? "localhost",
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER ?? "postgres",
    password: process.env.PGPASSWORD ?? "",
    database: process.env.PGDATABASE ?? "dinocamp",
  };
}

export const pool = new Pool(getPoolConfig());
