import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "better-sqlite3",
  driver: "better-sqlite3",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
