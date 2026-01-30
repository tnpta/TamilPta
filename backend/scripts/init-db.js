import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '..', 'data', 'school_reg.db');
const dbDir = join(__dirname, '..', 'data');

// Ensure data directory exists
try {
  mkdirSync(dbDir, { recursive: true });
} catch (err) {
  // Directory might already exist
}

const db = new Database(dbPath);

// Read and execute the schema SQL
const schemaSQL = `
PRAGMA foreign_keys = ON;

-- ----------------------------
-- DROP (child tables first)
-- ----------------------------
DROP TABLE IF EXISTS school_other_compliance_details;
DROP TABLE IF EXISTS school_vehicles;
DROP TABLE IF EXISTS class_level_expenses;
DROP TABLE IF EXISTS fees_fixation_details;

DROP TABLE IF EXISTS school_certificates;
DROP TABLE IF EXISTS school_building_blocks;
DROP TABLE IF EXISTS school_infrastructure;

DROP TABLE IF EXISTS class_wise_student_strength;
DROP TABLE IF EXISTS non_teaching_staff_summary;
DROP TABLE IF EXISTS staff_summary;

DROP TABLE IF EXISTS trust_management_details;

DROP TABLE IF EXISTS schools;

-- ----------------------------
-- 1) BASIC INFORMATION (MASTER)
-- ----------------------------
CREATE TABLE IF NOT EXISTS schools (
  school_mobile_no TEXT PRIMARY KEY,

  school_code TEXT,
  school_name TEXT,
  school_address TEXT,
  taluk TEXT,
  locality TEXT,
  pin_code TEXT,

  school_whatsapp_no TEXT,
  school_email_id TEXT,

  is_nursery_primary INTEGER DEFAULT 0,
  is_matriculation INTEGER DEFAULT 0,
  is_state_board_sf INTEGER DEFAULT 0,
  is_cbse INTEGER DEFAULT 0,
  is_icse INTEGER DEFAULT 0,
  is_igcse INTEGER DEFAULT 0,
  is_ib INTEGER DEFAULT 0,

  correspondent_title TEXT,
  correspondent_name TEXT,
  correspondent_mobile_no TEXT,
  correspondent_whatsapp_no TEXT,
  correspondent_email_id TEXT,

  principal_title TEXT,
  principal_name TEXT,
  principal_mobile_no TEXT,
  principal_whatsapp_no TEXT,
  principal_email_id TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'DRAFT'
);

CREATE INDEX IF NOT EXISTS idx_schools_code ON schools(school_code);

-- ----------------------------
-- 2) TRUST & MANAGEMENT
-- ----------------------------
CREATE TABLE IF NOT EXISTS trust_management_details (
  school_mobile_no TEXT PRIMARY KEY,

  trust_name TEXT,
  organization_type TEXT,
  registration_date TEXT,
  registration_number TEXT,
  renewal_details TEXT,
  trust_document_path TEXT,

  chairman_title TEXT,
  chairman_name TEXT,
  chairman_mobile_no TEXT,
  chairman_whatsapp_no TEXT,
  chairman_email_id TEXT,

  secretary_title TEXT,
  secretary_name TEXT,
  secretary_mobile_no TEXT,
  secretary_whatsapp_no TEXT,
  secretary_email_id TEXT,

  year_of_establishment INTEGER,
  classes_at_establishment TEXT,
  opening_order_no TEXT,
  rc_no TEXT,
  rc_date TEXT,

  additional_classes_details TEXT,
  additional_classes_order_path TEXT,

  latest_renewal_details TEXT,
  latest_renewal_order_path TEXT,

  first_board_exam_10_year INTEGER,
  first_board_exam_12_year INTEGER,

  classes_from TEXT,
  classes_to TEXT,

  is_pta_formed INTEGER DEFAULT 0,
  pta_affiliation_payment_details TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- ----------------------------
-- 3) STAFF & STUDENTS
-- ----------------------------
CREATE TABLE IF NOT EXISTS staff_summary (
  school_mobile_no TEXT PRIMARY KEY,

  teaching_pg_count INTEGER DEFAULT 0,
  teaching_ug_count INTEGER DEFAULT 0,
  teaching_sgt_count INTEGER DEFAULT 0,
  teaching_bed_count INTEGER DEFAULT 0,
  teaching_med_count INTEGER DEFAULT 0,
  tet_bed_qualified_count INTEGER DEFAULT 0,
  tet_sgt_qualified_count INTEGER DEFAULT 0,

  support_office_staff_count INTEGER DEFAULT 0,
  support_accountant_count INTEGER DEFAULT 0,
  support_library_staff_count INTEGER DEFAULT 0,
  support_drawing_staff_count INTEGER DEFAULT 0,
  support_pet_staff_count INTEGER DEFAULT 0,
  support_others_count INTEGER DEFAULT 0,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS non_teaching_staff_summary (
  school_mobile_no TEXT PRIMARY KEY,

  oa_count INTEGER DEFAULT 0,
  driver_vehicle_helper_count INTEGER DEFAULT 0,
  watchman_count INTEGER DEFAULT 0,
  aaya_count INTEGER DEFAULT 0,
  sweeper_count INTEGER DEFAULT 0,
  others_count INTEGER DEFAULT 0,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS class_wise_student_strength (
  school_mobile_no TEXT NOT NULL,
  class_name TEXT NOT NULL,

  boys_count INTEGER DEFAULT 0,
  girls_count INTEGER DEFAULT 0,
  rte_count INTEGER DEFAULT 0,
  emis_upload_path TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  PRIMARY KEY (school_mobile_no, class_name),
  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_students_school ON class_wise_student_strength(school_mobile_no);

-- ----------------------------
-- 4) INFRASTRUCTURE
-- ----------------------------
CREATE TABLE IF NOT EXISTS school_infrastructure (
  school_mobile_no TEXT PRIMARY KEY,

  school_location_type TEXT,

  total_land_acres REAL,
  total_land_sqft REAL,
  is_land_sufficient_as_per_norms INTEGER DEFAULT 0,
  land_sufficient_details TEXT,

  is_land_contiguous INTEGER DEFAULT 1,
  land_non_contiguous_distance_details TEXT,

  land_ownership_type TEXT,
  lease_years INTEGER,

  num_buildings_blocks INTEGER DEFAULT 0,

  unapproved_building_regularisation_steps TEXT,
  regularisation_fee_paid_rs INTEGER,
  regularisation_date_of_remittance TEXT,

  is_classrooms_commensurate INTEGER DEFAULT 0,
  classroom_size_sqft REAL,
  classroom_photo_path TEXT,

  toilets_boys_count INTEGER DEFAULT 0,
  toilets_boys_photo_path TEXT,
  toilets_girls_count INTEGER DEFAULT 0,
  toilets_girls_photo_path TEXT,
  is_toilets_separate_boys_girls INTEGER DEFAULT 0,

  drinking_water_taps_count INTEGER DEFAULT 0,
  drinking_water_photo_path TEXT,
  hand_wash_taps_count INTEGER DEFAULT 0,
  hand_wash_photo_path TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS school_building_blocks (
  school_mobile_no TEXT NOT NULL,
  block_no INTEGER NOT NULL,

  year_of_construction TEXT,
  number_of_floors INTEGER DEFAULT 0,
  is_building_plan_approved INTEGER DEFAULT 0,
  approval_details TEXT,
  approval_order_copy_path TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  PRIMARY KEY (school_mobile_no, block_no),
  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS school_certificates (
  school_mobile_no TEXT NOT NULL,
  certificate_type TEXT NOT NULL,

  certificate_no TEXT,
  date_authority TEXT,
  persons_accommodated INTEGER,
  certificate_document_path TEXT,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  PRIMARY KEY (school_mobile_no, certificate_type),
  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blocks_school ON school_building_blocks(school_mobile_no);
CREATE INDEX IF NOT EXISTS idx_certs_school ON school_certificates(school_mobile_no);

-- ----------------------------
-- 5) FEES & OTHERS
-- ----------------------------
CREATE TABLE IF NOT EXISTS fees_fixation_details (
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

CREATE TABLE IF NOT EXISTS class_level_expenses (
  school_mobile_no TEXT NOT NULL,
  expense_category TEXT NOT NULL,
  class_level TEXT NOT NULL,

  amount REAL DEFAULT 0,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  PRIMARY KEY (school_mobile_no, expense_category, class_level),
  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS school_vehicles (
  school_mobile_no TEXT PRIMARY KEY,

  number_of_vans INTEGER DEFAULT 0,
  number_of_buses INTEGER DEFAULT 0,
  other_vehicles_count INTEGER DEFAULT 0,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS school_other_compliance_details (
  school_mobile_no TEXT PRIMARY KEY,

  last_year_auditing_filed INTEGER DEFAULT 0,
  last_3_years_audit_status TEXT,

  has_health_care_center INTEGER DEFAULT 0,
  health_care_details TEXT,
  social_awareness_program_conducted INTEGER DEFAULT 0,
  social_awareness_details TEXT,
  social_service_program_conducted INTEGER DEFAULT 0,
  social_services_details TEXT,
  salary_processed_through_ecs INTEGER DEFAULT 0,

  declaration_accepted INTEGER DEFAULT 0,

  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),

  FOREIGN KEY (school_mobile_no)
    REFERENCES schools(school_mobile_no)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_expenses_school ON class_level_expenses(school_mobile_no);

-- ----------------------------
-- OPTIONAL: updated_at triggers
-- ----------------------------
CREATE TRIGGER IF NOT EXISTS trg_schools_updated_at
AFTER UPDATE ON schools
FOR EACH ROW
BEGIN
  UPDATE schools SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_trust_updated_at
AFTER UPDATE ON trust_management_details
FOR EACH ROW
BEGIN
  UPDATE trust_management_details SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_staff_updated_at
AFTER UPDATE ON staff_summary
FOR EACH ROW
BEGIN
  UPDATE staff_summary SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_non_teach_updated_at
AFTER UPDATE ON non_teaching_staff_summary
FOR EACH ROW
BEGIN
  UPDATE non_teaching_staff_summary SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_students_updated_at
AFTER UPDATE ON class_wise_student_strength
FOR EACH ROW
BEGIN
  UPDATE class_wise_student_strength
  SET updated_at = datetime('now')
  WHERE school_mobile_no = OLD.school_mobile_no AND class_name = OLD.class_name;
END;

CREATE TRIGGER IF NOT EXISTS trg_infra_updated_at
AFTER UPDATE ON school_infrastructure
FOR EACH ROW
BEGIN
  UPDATE school_infrastructure SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_blocks_updated_at
AFTER UPDATE ON school_building_blocks
FOR EACH ROW
BEGIN
  UPDATE school_building_blocks
  SET updated_at = datetime('now')
  WHERE school_mobile_no = OLD.school_mobile_no AND block_no = OLD.block_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_certs_updated_at
AFTER UPDATE ON school_certificates
FOR EACH ROW
BEGIN
  UPDATE school_certificates
  SET updated_at = datetime('now')
  WHERE school_mobile_no = OLD.school_mobile_no AND certificate_type = OLD.certificate_type;
END;

CREATE TRIGGER IF NOT EXISTS trg_fees_updated_at
AFTER UPDATE ON fees_fixation_details
FOR EACH ROW
BEGIN
  UPDATE fees_fixation_details SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_expenses_updated_at
AFTER UPDATE ON class_level_expenses
FOR EACH ROW
BEGIN
  UPDATE class_level_expenses
  SET updated_at = datetime('now')
  WHERE school_mobile_no = OLD.school_mobile_no
    AND expense_category = OLD.expense_category
    AND class_level = OLD.class_level;
END;

CREATE TRIGGER IF NOT EXISTS trg_vehicles_updated_at
AFTER UPDATE ON school_vehicles
FOR EACH ROW
BEGIN
  UPDATE school_vehicles SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

CREATE TRIGGER IF NOT EXISTS trg_compliance_updated_at
AFTER UPDATE ON school_other_compliance_details
FOR EACH ROW
BEGIN
  UPDATE school_other_compliance_details SET updated_at = datetime('now') WHERE school_mobile_no = OLD.school_mobile_no;
END;

-- Add pta_consultation_details column if it doesn't exist (for existing databases)
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we'll use a try-catch approach
-- This will be handled by the application or manually if needed
`;

try {
  db.exec(schemaSQL);
  console.log('✅ Database initialized successfully!');
  console.log(`📁 Database location: ${dbPath}`);
} catch (err) {
  console.error('❌ Error initializing database:', err);
  process.exit(1);
} finally {
  db.close();
}
