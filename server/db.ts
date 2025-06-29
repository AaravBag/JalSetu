import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from "@shared/schema";

// Use a local SQLite file for development and production
const databaseUrl = process.env.DATABASE_URL || 'file:./app.db';

console.log('Database URL:', databaseUrl);

const client = createClient({ url: databaseUrl });
export const db = drizzle(client, { schema });