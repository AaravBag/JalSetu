import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@shared/schema';

// Create a new database connection
const sqlite = new Database('dev.db');
const db = drizzle(sqlite);

// Type for last inserted ID result
interface LastInsertId {
  id: number;
}

// Create tables
async function migrate() {
  try {
    // Drop existing tables if they exist
    await sqlite.exec(`DROP TABLE IF EXISTS irrigation_tips`);
    await sqlite.exec(`DROP TABLE IF EXISTS weather_predictions`);
    await sqlite.exec(`DROP TABLE IF EXISTS soil_moistures`);
    await sqlite.exec(`DROP TABLE IF EXISTS water_qualities`);
    await sqlite.exec(`DROP TABLE IF EXISTS fields`);
    await sqlite.exec(`DROP TABLE IF EXISTS farms`);
    await sqlite.exec(`DROP TABLE IF EXISTS users`);

    // Create tables in order of dependencies
    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS farms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        status TEXT DEFAULT 'Your farm is thriving',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS fields (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        farm_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS water_qualities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farm_id INTEGER NOT NULL,
        ph_level TEXT NOT NULL,
        tds TEXT NOT NULL,
        clarity TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS soil_moistures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farm_id INTEGER NOT NULL,
        field_id INTEGER NOT NULL,
        moisture_level INTEGER NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
        FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS weather_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farm_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        advice TEXT NOT NULL,
        forecast TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
      )
    `);

    await sqlite.exec(`
      CREATE TABLE IF NOT EXISTS irrigation_tips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farm_id INTEGER NOT NULL,
        tip TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables created successfully');

    // Insert initial user and farm
    const userStmt = sqlite.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `);
    userStmt.run('Ramesh', 'ramesh@example.com', 'password123');
    const userId = (sqlite.prepare('SELECT last_insert_rowid() as id').get() as LastInsertId).id;

    const farmStmt = sqlite.prepare(`
      INSERT INTO farms (name, location, user_id, status)
      VALUES (?, ?, ?, ?)
    `);
    farmStmt.run('Green Valley Farm', 'Noida', userId, 'Your farm is thriving');
    const farmId = (sqlite.prepare('SELECT last_insert_rowid() as id').get() as LastInsertId).id;

    // Insert initial field
    const fieldStmt = sqlite.prepare(`
      INSERT INTO fields (name, farm_id)
      VALUES (?, ?)
    `);
    fieldStmt.run('Field 1', farmId);

    console.log('Initial data seeded successfully');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate(); 