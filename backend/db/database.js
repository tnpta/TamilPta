import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '..', 'data', 'school_reg.db');
const dbDir = join(__dirname, '..', 'data');

// Ensure data directory exists
try {
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }
} catch (err) {
  console.error('Error creating data directory:', err);
}

// Create database connection
const db = new Database(dbPath);

console.log('✅ Database connected:', dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');
// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Function to checkpoint WAL (merge WAL changes into main database)
export function checkpoint() {
  try {
    db.pragma('wal_checkpoint(TRUNCATE)');
    console.log('✅ WAL checkpoint completed');
  } catch (err) {
    console.error('❌ Error during checkpoint:', err);
  }
}

export default db;
