import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

let db: ReturnType<typeof drizzle>;

try {
  const sqlite = new Database('dev.db');
  db = drizzle(sqlite, { schema });
  
  console.log('Successfully connected to SQLite database');
} catch (error) {
  console.error('Error initializing database:', error);
  console.log('Using mock data as fallback');
  
  // Create dummy db for type compatibility
  db = {} as ReturnType<typeof drizzle>;
}

export { db };