-- ============================================
-- Tamil Nadu PTA - Supabase PostgreSQL Schema
-- Run this in Supabase SQL Editor
-- Safe to re-run (uses IF NOT EXISTS everywhere)
-- ============================================

-- 0) USERS & AUTH
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(10) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
  district TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Insert default super admin (password: admin123 - change in production!)
-- bcrypt hash for 'admin123'
INSERT INTO users (mobile, password_hash, name, role)
VALUES ('9999999999', '$2a$10$jIrvRper7.IqF67.9Gg5Ne0X.NezTiHmvlexbW/9t4ygBDlqolOPa', 'Super Admin', 'super_admin')
ON CONFLICT (mobile) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- 1) BASIC INFORMATION (MASTER)
CREATE TABLE IF NOT EXISTS schools (
  school_mobile_no VARCHAR(10) PRIMARY KEY,
  school_code TEXT,
  school_name TEXT,
  school_address TEXT,
  taluk TEXT,
  locality TEXT,
  pin_code TEXT,
  school_whatsapp_no TEXT,
  school_email_id TEXT,
  school_type TEXT,
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
  district TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'DRAFT'
);

CREATE INDEX IF NOT EXISTS idx_schools_code ON schools(school_code);
CREATE INDEX IF NOT EXISTS idx_schools_district ON schools(district);
CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);

-- 2) TRUST & MANAGEMENT
CREATE TABLE IF NOT EXISTS trust_management_details (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
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
  is_pta_formed BOOLEAN DEFAULT false,
  pta_affiliation_payment_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) STAFF & STUDENTS
CREATE TABLE IF NOT EXISTS staff_summary (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS non_teaching_staff_summary (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  oa_count INTEGER DEFAULT 0,
  driver_vehicle_helper_count INTEGER DEFAULT 0,
  watchman_count INTEGER DEFAULT 0,
  aaya_count INTEGER DEFAULT 0,
  sweeper_count INTEGER DEFAULT 0,
  others_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_wise_student_strength (
  school_mobile_no VARCHAR(10) NOT NULL REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  boys_count INTEGER DEFAULT 0,
  girls_count INTEGER DEFAULT 0,
  rte_count INTEGER DEFAULT 0,
  emis_upload_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (school_mobile_no, class_name)
);

CREATE INDEX IF NOT EXISTS idx_students_school ON class_wise_student_strength(school_mobile_no);

-- 4) INFRASTRUCTURE
CREATE TABLE IF NOT EXISTS school_infrastructure (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  school_location_type TEXT,
  total_land_acres REAL,
  total_land_sqft REAL,
  total_land_ground REAL,
  is_land_sufficient_as_per_norms BOOLEAN DEFAULT false,
  land_sufficient_details TEXT,
  is_land_contiguous BOOLEAN DEFAULT true,
  land_non_contiguous_distance_details TEXT,
  ht_lines_or_canal TEXT,
  land_latitude TEXT,
  land_longitude TEXT,
  land_ownership_type TEXT,
  lease_years INTEGER,
  num_buildings_blocks INTEGER DEFAULT 0,
  unapproved_building_regularisation_steps TEXT,
  regularisation_fee_paid_rs INTEGER,
  regularisation_date_of_remittance TEXT,
  is_classrooms_commensurate BOOLEAN DEFAULT false,
  classroom_size_sqft REAL,
  toilets_boys_count INTEGER DEFAULT 0,
  toilets_girls_count INTEGER DEFAULT 0,
  is_toilets_separate_boys_girls BOOLEAN DEFAULT false,
  drinking_water_taps_count INTEGER DEFAULT 0,
  hand_wash_taps_count INTEGER DEFAULT 0,
  youtube_link TEXT,
  lift_or_ramps TEXT,
  ramp_at_entry TEXT,
  cwsn_toilets TEXT,
  stability_cert_issued_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_building_blocks (
  school_mobile_no VARCHAR(10) NOT NULL REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  block_no INTEGER NOT NULL,
  year_of_construction TEXT,
  number_of_floors INTEGER DEFAULT 0,
  is_building_plan_approved BOOLEAN DEFAULT false,
  approval_details TEXT,
  approval_order_copy_path TEXT,
  floors_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (school_mobile_no, block_no)
);

CREATE TABLE IF NOT EXISTS school_certificates (
  school_mobile_no VARCHAR(10) NOT NULL REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  certificate_type TEXT NOT NULL,
  certificate_no TEXT,
  date_authority TEXT,
  persons_accommodated INTEGER,
  certificate_document_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (school_mobile_no, certificate_type)
);

CREATE INDEX IF NOT EXISTS idx_blocks_school ON school_building_blocks(school_mobile_no);
CREATE INDEX IF NOT EXISTS idx_certs_school ON school_certificates(school_mobile_no);

-- 5) FEES & OTHERS
CREATE TABLE IF NOT EXISTS fees_fixation_details (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  has_fees_fixation_order BOOLEAN DEFAULT false,
  fees_fixation_order_path TEXT,
  pta_consulted_during_fixation BOOLEAN DEFAULT false,
  pta_consultation_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_vehicles (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  number_of_vans INTEGER DEFAULT 0,
  number_of_buses INTEGER DEFAULT 0,
  other_vehicles_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_other_compliance_details (
  school_mobile_no VARCHAR(10) PRIMARY KEY REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  has_health_care_center BOOLEAN DEFAULT false,
  health_care_details TEXT,
  social_awareness_program_conducted BOOLEAN DEFAULT false,
  social_awareness_details TEXT,
  social_service_program_conducted BOOLEAN DEFAULT false,
  social_services_details TEXT,
  salary_processed_through_ecs BOOLEAN DEFAULT false,
  declaration_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Auto-update updated_at triggers
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated ON users;
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_schools_updated ON schools;
CREATE TRIGGER trg_schools_updated BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_trust_updated ON trust_management_details;
CREATE TRIGGER trg_trust_updated BEFORE UPDATE ON trust_management_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_staff_updated ON staff_summary;
CREATE TRIGGER trg_staff_updated BEFORE UPDATE ON staff_summary FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_non_teach_updated ON non_teaching_staff_summary;
CREATE TRIGGER trg_non_teach_updated BEFORE UPDATE ON non_teaching_staff_summary FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_students_updated ON class_wise_student_strength;
CREATE TRIGGER trg_students_updated BEFORE UPDATE ON class_wise_student_strength FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_infra_updated ON school_infrastructure;
CREATE TRIGGER trg_infra_updated BEFORE UPDATE ON school_infrastructure FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_blocks_updated ON school_building_blocks;
CREATE TRIGGER trg_blocks_updated BEFORE UPDATE ON school_building_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_certs_updated ON school_certificates;
CREATE TRIGGER trg_certs_updated BEFORE UPDATE ON school_certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_fees_updated ON fees_fixation_details;
CREATE TRIGGER trg_fees_updated BEFORE UPDATE ON fees_fixation_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_vehicles_updated ON school_vehicles;
CREATE TRIGGER trg_vehicles_updated BEFORE UPDATE ON school_vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS trg_compliance_updated ON school_other_compliance_details;
CREATE TRIGGER trg_compliance_updated BEFORE UPDATE ON school_other_compliance_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- v2: New teacher structure, CBSE fields, room details, classroom grid
-- ============================================

-- 6A) New teaching staff columns on staff_summary
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS secondary_grade_dted_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS secondary_grade_dted_tet_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS graduate_assistant_bed_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS graduate_assistant_bed_tet_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS post_graduate_teacher_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS computer_teacher_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS computer_teacher_tet_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS physical_education_teacher_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS other_special_teacher_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS post_graduate_teacher_tet_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS physical_education_teacher_tet_count INTEGER DEFAULT 0;
ALTER TABLE staff_summary ADD COLUMN IF NOT EXISTS other_special_teacher_tet_count INTEGER DEFAULT 0;

-- 6B) CBSE registration fields on trust_management_details
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_noc_date_no TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_noc_document_path TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_affiliation_date_no TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_affiliation_classes TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_affiliation_document_path TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_recognition_period_classes TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_recognition_date_no TEXT;
ALTER TABLE trust_management_details ADD COLUMN IF NOT EXISTS cbse_recognition_document_path TEXT;

-- 6C) Room details table
CREATE TABLE IF NOT EXISTS school_room_details (
  school_mobile_no VARCHAR(10) NOT NULL REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  serial_no INTEGER NOT NULL,
  num_rooms INTEGER DEFAULT 0,
  block TEXT,
  floor TEXT,
  area_sqft TEXT,
  roofing TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (school_mobile_no, room_type)
);

CREATE INDEX IF NOT EXISTS idx_room_details_school ON school_room_details(school_mobile_no);

DROP TRIGGER IF EXISTS trg_room_details_updated ON school_room_details;
CREATE TRIGGER trg_room_details_updated BEFORE UPDATE ON school_room_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 6D) Playground area on infrastructure
ALTER TABLE school_infrastructure ADD COLUMN IF NOT EXISTS total_playground_area_sqft TEXT;

-- 6E) Classroom distribution grid
CREATE TABLE IF NOT EXISTS school_classroom_grid (
  school_mobile_no VARCHAR(10) NOT NULL REFERENCES schools(school_mobile_no) ON UPDATE CASCADE ON DELETE CASCADE,
  block_no INTEGER NOT NULL,
  ground_floor_rooms INTEGER DEFAULT 0,
  first_floor_rooms INTEGER DEFAULT 0,
  second_floor_rooms INTEGER DEFAULT 0,
  third_floor_rooms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (school_mobile_no, block_no)
);

CREATE INDEX IF NOT EXISTS idx_classroom_grid_school ON school_classroom_grid(school_mobile_no);

DROP TRIGGER IF EXISTS trg_classroom_grid_updated ON school_classroom_grid;
CREATE TRIGGER trg_classroom_grid_updated BEFORE UPDATE ON school_classroom_grid FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Supabase Storage bucket (run via dashboard or CLI)
-- ============================================
-- Create a storage bucket named 'school-documents' via Supabase Dashboard:
-- 1. Go to Storage → New Bucket
-- 2. Name: school-documents
-- 3. Public: No (private)
-- 4. File size limit: 10MB
-- 5. Allowed MIME types: application/pdf, application/msword,
--    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
--    image/jpeg, image/png
