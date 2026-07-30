import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

export const isUsingMemoryStore = !databaseUrl;

let drizzleDb: ReturnType<typeof drizzle> | null = null;
let pgPool: Pool | null = null;

if (databaseUrl) {
  const globalForDb = globalThis as typeof globalThis & {
    __arenaNextJsPostgresqlPool?: Pool;
  };

  pgPool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pgPool;
  }

  drizzleDb = drizzle(pgPool);
}

export const db = drizzleDb;
export const pool = pgPool;
