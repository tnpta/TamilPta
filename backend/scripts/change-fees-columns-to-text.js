import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');

console.log('🔄 Changing fees columns from REAL to TEXT...');
console.log(`📁 Database location: ${dbPath}`);

try {
  const db = new Database(dbPath);
  
  // SQLite doesn't support ALTER COLUMN directly, so we need to:
  // 1. Create a new table with TEXT columns
  // 2. Copy data from old table
  // 3. Drop old table
  // 4. Rename new table
  
  console.log('📝 Creating temporary table with TEXT columns...');
  
  db.exec(`
    CREATE TABLE fees_fixation_details_new (
      school_mobile_no TEXT PRIMARY KEY,
      has_fees_fixation_order INTEGER DEFAULT 0,
      fees_fixation_order_path TEXT,
      pta_consulted_during_fixation INTEGER DEFAULT 0,
      pta_consultation_details TEXT,
      fees_collected_by_school TEXT,
      fees_fixed_by_committee TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (school_mobile_no)
        REFERENCES schools(school_mobile_no)
        ON UPDATE CASCADE ON DELETE CASCADE
    );
  `);
  
  console.log('📋 Copying data from old table...');
  
  db.exec(`
    INSERT INTO fees_fixation_details_new 
    SELECT 
      school_mobile_no,
      has_fees_fixation_order,
      fees_fixation_order_path,
      pta_consulted_during_fixation,
      pta_consultation_details,
      CASE 
        WHEN fees_collected_by_school IS NULL THEN NULL
        ELSE CAST(fees_collected_by_school AS TEXT)
      END as fees_collected_by_school,
      CASE 
        WHEN fees_fixed_by_committee IS NULL THEN NULL
        ELSE CAST(fees_fixed_by_committee AS TEXT)
      END as fees_fixed_by_committee,
      created_at,
      updated_at
    FROM fees_fixation_details;
  `);
  
  console.log('🗑️  Dropping old table...');
  db.exec('DROP TABLE fees_fixation_details;');
  
  console.log('🔄 Renaming new table...');
  db.exec('ALTER TABLE fees_fixation_details_new RENAME TO fees_fixation_details;');
  
  db.close();
  console.log('✅ Successfully changed fees_collected_by_school and fees_fixed_by_committee to TEXT type!');
} catch (err) {
  console.error('❌ Error during migration:', err);
  process.exit(1);
}
