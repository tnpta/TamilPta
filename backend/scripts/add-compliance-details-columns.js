import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');

console.log('🔄 Adding detail columns to school_other_compliance_details table...');
console.log(`📁 Database location: ${dbPath}`);

try {
  const db = new Database(dbPath);
  
  // List of columns to add
  const columnsToAdd = [
    { name: 'health_care_details', type: 'TEXT' },
    { name: 'social_awareness_details', type: 'TEXT' },
    { name: 'social_services_details', type: 'TEXT' }
  ];
  
  // Check and add each column
  for (const column of columnsToAdd) {
    try {
      // Try to select the column - if it exists, this will succeed
      db.prepare(`SELECT ${column.name} FROM school_other_compliance_details LIMIT 1`).get();
      console.log(`✅ Column ${column.name} already exists. Skipping.`);
    } catch (err) {
      // Column doesn't exist, add it
      console.log(`📝 Adding column ${column.name}...`);
      db.exec(`ALTER TABLE school_other_compliance_details ADD COLUMN ${column.name} ${column.type}`);
      console.log(`✅ Successfully added column ${column.name}!`);
    }
  }
  
  db.close();
  console.log('✅ Migration completed!');
} catch (err) {
  console.error('❌ Error during migration:', err);
  process.exit(1);
}
