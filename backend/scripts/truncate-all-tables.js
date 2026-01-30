import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'school_reg.db');

console.log('🗑️  Truncating all tables...');
console.log(`📁 Database location: ${dbPath}`);

try {
  const db = new Database(dbPath);
  
  // Disable foreign keys temporarily
  db.pragma('foreign_keys = OFF');
  
  // List of all tables (in order to respect foreign key constraints)
  // Delete child tables first, then parent tables
  const tables = [
    // Child tables first
    'school_other_compliance_details',
    'school_vehicles',
    'class_level_expenses',
    'fees_fixation_details',
    'school_certificates',
    'school_building_blocks',
    'school_infrastructure',
    'class_wise_student_strength',
    'non_teaching_staff_summary',
    'staff_summary',
    'trust_management_details',
    // Parent table last
    'schools'
  ];
  
  console.log(`\n📋 Found ${tables.length} tables to truncate\n`);
  
  // Truncate each table
  for (const table of tables) {
    try {
      const result = db.prepare(`DELETE FROM ${table}`).run();
      console.log(`✅ Truncated ${table}: ${result.changes} row(s) deleted`);
    } catch (err) {
      console.error(`❌ Error truncating ${table}:`, err.message);
    }
  }
  
  // Re-enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Vacuum to reclaim space
  console.log('\n🧹 Running VACUUM to reclaim space...');
  db.exec('VACUUM');
  
  db.close();
  console.log('\n✅ All tables truncated successfully!');
  console.log('📊 Database has been cleared and optimized.');
} catch (err) {
  console.error('❌ Error during truncation:', err);
  process.exit(1);
}
