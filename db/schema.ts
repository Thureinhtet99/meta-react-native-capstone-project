import db from "./client";

export async function menuTable() {
  const database = await db;
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
}

export async function customerTable() {
  const database = await db;
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
}

export async function initializeDatabase() {
  try {
    await menuTable();
    await customerTable();
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
