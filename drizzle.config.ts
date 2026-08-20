import { defineConfig } from "drizzle-kit";

const directDatabaseUrl = process.env.DIRECT_DATABASE_URL;

if (!directDatabaseUrl) {
  throw new Error("DIRECT_DATABASE_URL is required for Drizzle migration commands.");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: directDatabaseUrl,
  },
});
