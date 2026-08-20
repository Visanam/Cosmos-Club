/**
 * B1 data access: Neon Postgres via the pooled serverless connection.
 * Use DIRECT_DATABASE_URL only in drizzle.config.ts for migration commands.
 */
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../drizzle/schema.js";
import { requireDatabaseUrl } from "./env.js";

type Database = NodePgDatabase<typeof schema>;

let pool: Pool | undefined;
let db: Database | undefined;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: requireDatabaseUrl(),
      max: 1,
    });
  }

  return pool;
}

/** Returns the shared Neon-backed Drizzle instance for future REST handlers. */
export function getDb(): Database {
  if (!db) {
    db = drizzle(getPool(), { schema });
  }

  return db;
}

/** A minimal query used only by the health endpoint; it does not read user data. */
export async function pingDatabase(): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query("select 1");
  } finally {
    client.release();
  }
}
