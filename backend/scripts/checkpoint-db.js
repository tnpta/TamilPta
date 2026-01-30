import db, { checkpoint } from '../db/database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');

console.log('🔄 Running WAL checkpoint...');
checkpoint();
console.log('✅ Checkpoint complete! All WAL changes have been merged into the main database.');
console.log('📁 Database location:', dbPath);

// Close the database connection
db.close();
