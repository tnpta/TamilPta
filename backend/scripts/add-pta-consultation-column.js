import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');

console.log('🔄 Adding pta_consultation_details column to fees_fixation_details table...');
console.log(`📁 Database location: ${dbPath}`);

try {
  const db = new Database(dbPath);
  
  // Check if column already exists by trying to select it
  try {
    db.prepare('SELECT pta_consultation_details FROM fees_fixation_details LIMIT 1').get();
    console.log('✅ Column pta_consultation_details already exists. No migration needed.');
  } catch (err) {
    // Column doesn't exist, add it
    console.log('📝 Column not found. Adding pta_consultation_details column...');
    db.exec('ALTER TABLE fees_fixation_details ADD COLUMN pta_consultation_details TEXT');
    console.log('✅ Successfully added pta_consultation_details column!');
  }
  
  db.close();
  console.log('✅ Migration completed!');
} catch (err) {
  console.error('❌ Error during migration:', err);
  process.exit(1);
}
