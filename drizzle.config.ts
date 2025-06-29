import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL || 'file:./app.db';

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});