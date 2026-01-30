import db, { checkpoint } from '../db/database.js';

/**
 * Check if school exists by mobile number
 */
export function checkSchoolExists(mobile) {
  const row = db.prepare('SELECT 1 FROM schools WHERE school_mobile_no = ? LIMIT 1').get(mobile);
  return !!row;
}

/**
 * Fetch all school data grouped by tabs
 */
export async function getSchoolFullData(mobile) {
  try {
    const result = {
      basic: null,
      trust: null,
      staff: {
        summary: null,
        nonTeaching: null,
        students: []
      },
      infrastructure: {
        main: null,
        blocks: [],
        certificates: []
      },
      fees: {
        feesFixation: null,
        expenses: [],
        vehicles: null,
        others: null
      }
    };

    // Basic info
    result.basic = db.prepare('SELECT * FROM schools WHERE school_mobile_no = ?').get(mobile) || null;

    // Trust management
    result.trust = db.prepare('SELECT * FROM trust_management_details WHERE school_mobile_no = ?').get(mobile) || null;

    // Staff summary
    result.staff.summary = db.prepare('SELECT * FROM staff_summary WHERE school_mobile_no = ?').get(mobile) || null;

    // Non-teaching staff
    result.staff.nonTeaching = db.prepare('SELECT * FROM non_teaching_staff_summary WHERE school_mobile_no = ?').get(mobile) || null;

    // Students
    result.staff.students = db.prepare('SELECT * FROM class_wise_student_strength WHERE school_mobile_no = ?').all(mobile) || [];

    // Infrastructure
    result.infrastructure.main = db.prepare('SELECT * FROM school_infrastructure WHERE school_mobile_no = ?').get(mobile) || null;

    // Building blocks
    result.infrastructure.blocks = db.prepare('SELECT * FROM school_building_blocks WHERE school_mobile_no = ? ORDER BY block_no').all(mobile) || [];

    // Certificates
    result.infrastructure.certificates = db.prepare('SELECT * FROM school_certificates WHERE school_mobile_no = ?').all(mobile) || [];

    // Fees fixation
    result.fees.feesFixation = db.prepare('SELECT * FROM fees_fixation_details WHERE school_mobile_no = ?').get(mobile) || null;

    // Expenses
    result.fees.expenses = db.prepare('SELECT * FROM class_level_expenses WHERE school_mobile_no = ?').all(mobile) || [];

    // Vehicles
    result.fees.vehicles = db.prepare('SELECT * FROM school_vehicles WHERE school_mobile_no = ?').get(mobile) || null;

    // Other compliance
    result.fees.others = db.prepare('SELECT * FROM school_other_compliance_details WHERE school_mobile_no = ?').get(mobile) || null;

    return result;
  } catch (error) {
    console.error('Error fetching school data:', error);
    throw error;
  }
}

/**
 * Helper to run SQL with error handling
 */
function runSQL(sql, params, tableName) {
  try {
    const stmt = db.prepare(sql);
    const result = stmt.run(params);
    return result;
  } catch (err) {
    console.error(`❌ Error in ${tableName}:`, err.message);
    console.error('SQL:', sql.substring(0, 300));
    console.error('Params count:', params ? params.length : 0);
    throw new Error(`${tableName}: ${err.message}`);
  }
}

/**
 * Save school data (Draft or Submit) using transaction
 */
export function saveSchoolData(mobile, data, isSubmit = false) {
  const transaction = db.transaction(() => {
    try {
          // 1. Save Basic Info (schools table)
          if (data.basic) {
            const basic = data.basic;
            const basicSql = `
              INSERT INTO schools (
                school_mobile_no, school_code, school_name, school_address, taluk, locality, pin_code,
                school_whatsapp_no, school_email_id,
                is_nursery_primary, is_matriculation, is_state_board_sf, is_cbse, is_icse, is_igcse, is_ib,
                correspondent_title, correspondent_name, correspondent_mobile_no, correspondent_whatsapp_no, correspondent_email_id,
                principal_title, principal_name, principal_mobile_no, principal_whatsapp_no, principal_email_id,
                status
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                school_code = excluded.school_code,
                school_name = excluded.school_name,
                school_address = excluded.school_address,
                taluk = excluded.taluk,
                locality = excluded.locality,
                pin_code = excluded.pin_code,
                school_whatsapp_no = excluded.school_whatsapp_no,
                school_email_id = excluded.school_email_id,
                is_nursery_primary = excluded.is_nursery_primary,
                is_matriculation = excluded.is_matriculation,
                is_state_board_sf = excluded.is_state_board_sf,
                is_cbse = excluded.is_cbse,
                is_icse = excluded.is_icse,
                is_igcse = excluded.is_igcse,
                is_ib = excluded.is_ib,
                correspondent_title = excluded.correspondent_title,
                correspondent_name = excluded.correspondent_name,
                correspondent_mobile_no = excluded.correspondent_mobile_no,
                correspondent_whatsapp_no = excluded.correspondent_whatsapp_no,
                correspondent_email_id = excluded.correspondent_email_id,
                principal_title = excluded.principal_title,
                principal_name = excluded.principal_name,
                principal_mobile_no = excluded.principal_mobile_no,
                principal_whatsapp_no = excluded.principal_whatsapp_no,
                principal_email_id = excluded.principal_email_id,
                status = excluded.status,
                updated_at = datetime('now')
            `;
            
            runSQL(basicSql, [
              mobile,
              basic.school_code || null,
              basic.school_name || null,
              basic.school_address || null,
              basic.taluk || null,
              basic.locality || null,
              basic.pin_code || null,
              basic.school_whatsapp_no || null,
              basic.school_email_id || null,
              basic.is_nursery_primary ? 1 : 0,
              basic.is_matriculation ? 1 : 0,
              basic.is_state_board_sf ? 1 : 0,
              basic.is_cbse ? 1 : 0,
              basic.is_icse ? 1 : 0,
              basic.is_igcse ? 1 : 0,
              basic.is_ib ? 1 : 0,
              basic.correspondent_title || null,
              basic.correspondent_name || null,
              basic.correspondent_mobile_no || null,
              basic.correspondent_whatsapp_no || null,
              basic.correspondent_email_id || null,
              basic.principal_title || null,
              basic.principal_name || null,
              basic.principal_mobile_no || null,
              basic.principal_whatsapp_no || null,
              basic.principal_email_id || null,
              isSubmit ? 'SUBMITTED' : 'DRAFT',
            ], 'schools');
          }

          // 2. Save Trust Management
          console.log('[Trust] Checking for trust data. data.trust exists?', !!data.trust);
          console.log('[Trust] Full data object keys:', Object.keys(data));
          if (data.trust) {
            const trust = data.trust;
            console.log('[Trust] ✅ Saving trust data for mobile:', mobile);
            console.log('[Trust] Trust data:', JSON.stringify(trust, null, 2));
            const trustSql = `
              INSERT INTO trust_management_details (
                school_mobile_no, trust_name, organization_type, registration_date, registration_number,
                renewal_details, trust_document_path,
                chairman_title, chairman_name, chairman_mobile_no, chairman_whatsapp_no, chairman_email_id,
                secretary_title, secretary_name, secretary_mobile_no, secretary_whatsapp_no, secretary_email_id,
                year_of_establishment, classes_at_establishment, opening_order_no, rc_no, rc_date,
                additional_classes_details, additional_classes_order_path,
                latest_renewal_details, latest_renewal_order_path,
                first_board_exam_10_year, first_board_exam_12_year,
                classes_from, classes_to,
                is_pta_formed, pta_affiliation_payment_details
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                trust_name = excluded.trust_name,
                organization_type = excluded.organization_type,
                registration_date = excluded.registration_date,
                registration_number = excluded.registration_number,
                renewal_details = excluded.renewal_details,
                trust_document_path = excluded.trust_document_path,
                chairman_title = excluded.chairman_title,
                chairman_name = excluded.chairman_name,
                chairman_mobile_no = excluded.chairman_mobile_no,
                chairman_whatsapp_no = excluded.chairman_whatsapp_no,
                chairman_email_id = excluded.chairman_email_id,
                secretary_title = excluded.secretary_title,
                secretary_name = excluded.secretary_name,
                secretary_mobile_no = excluded.secretary_mobile_no,
                secretary_whatsapp_no = excluded.secretary_whatsapp_no,
                secretary_email_id = excluded.secretary_email_id,
                year_of_establishment = excluded.year_of_establishment,
                classes_at_establishment = excluded.classes_at_establishment,
                opening_order_no = excluded.opening_order_no,
                rc_no = excluded.rc_no,
                rc_date = excluded.rc_date,
                additional_classes_details = excluded.additional_classes_details,
                additional_classes_order_path = excluded.additional_classes_order_path,
                latest_renewal_details = excluded.latest_renewal_details,
                latest_renewal_order_path = excluded.latest_renewal_order_path,
                first_board_exam_10_year = excluded.first_board_exam_10_year,
                first_board_exam_12_year = excluded.first_board_exam_12_year,
                classes_from = excluded.classes_from,
                classes_to = excluded.classes_to,
                is_pta_formed = excluded.is_pta_formed,
                pta_affiliation_payment_details = excluded.pta_affiliation_payment_details,
                updated_at = datetime('now')
            `;
            
            runSQL(trustSql, [
              mobile,
              trust.trust_name || null,
              trust.organization_type || null,
              trust.registration_date || null,
              trust.registration_number || null,
              trust.renewal_details || null,
              trust.trust_document_path || null,
              trust.chairman_title || null,
              trust.chairman_name || null,
              trust.chairman_mobile_no || null,
              trust.chairman_whatsapp_no || null,
              trust.chairman_email_id || null,
              trust.secretary_title || null,
              trust.secretary_name || null,
              trust.secretary_mobile_no || null,
              trust.secretary_whatsapp_no || null,
              trust.secretary_email_id || null,
              trust.year_of_establishment || null,
              trust.classes_at_establishment || null,
              trust.opening_order_no || null,
              trust.rc_no || null,
              trust.rc_date || null,
              trust.additional_classes_details || null,
              trust.additional_classes_order_path || null,
              trust.latest_renewal_details || null,
              trust.latest_renewal_order_path || null,
              trust.first_board_exam_10_year || null,
              trust.first_board_exam_12_year || null,
              trust.classes_from || null,
              trust.classes_to || null,
              trust.is_pta_formed ? 1 : 0,
              trust.pta_affiliation_payment_details || null,
            ], 'trust_management_details');
            console.log('[Trust] ✅ Trust data saved successfully');
          } else {
            console.log('[Trust] ❌ No trust data found in request. Skipping trust save.');
          }

          // 3. Save Staff Summary
          console.log('[Staff] Checking for staff data. data.staff exists?', !!data.staff);
          console.log('[Staff] data.staff.summary exists?', !!data.staff?.summary);
          // Always save staff summary if it exists (even if all values are 0)
          if (data.staff && data.staff.summary) {
            const staff = data.staff.summary;
            console.log('[Staff] ✅ Saving staff summary for mobile:', mobile);
            console.log('[Staff] Staff data:', JSON.stringify(staff, null, 2));
            const staffSql = `
              INSERT INTO staff_summary (
                school_mobile_no,
                teaching_pg_count, teaching_ug_count, teaching_sgt_count, teaching_bed_count, teaching_med_count,
                tet_bed_qualified_count, tet_sgt_qualified_count,
                support_office_staff_count, support_accountant_count, support_library_staff_count,
                support_drawing_staff_count, support_pet_staff_count, support_others_count
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                teaching_pg_count = excluded.teaching_pg_count,
                teaching_ug_count = excluded.teaching_ug_count,
                teaching_sgt_count = excluded.teaching_sgt_count,
                teaching_bed_count = excluded.teaching_bed_count,
                teaching_med_count = excluded.teaching_med_count,
                tet_bed_qualified_count = excluded.tet_bed_qualified_count,
                tet_sgt_qualified_count = excluded.tet_sgt_qualified_count,
                support_office_staff_count = excluded.support_office_staff_count,
                support_accountant_count = excluded.support_accountant_count,
                support_library_staff_count = excluded.support_library_staff_count,
                support_drawing_staff_count = excluded.support_drawing_staff_count,
                support_pet_staff_count = excluded.support_pet_staff_count,
                support_others_count = excluded.support_others_count,
                updated_at = datetime('now')
            `;
            
            runSQL(staffSql, [
              mobile,
              staff.teaching_pg_count || 0,
              staff.teaching_ug_count || 0,
              staff.teaching_sgt_count || 0,
              staff.teaching_bed_count || 0,
              staff.teaching_med_count || 0,
              staff.tet_bed_qualified_count || 0,
              staff.tet_sgt_qualified_count || 0,
              staff.support_office_staff_count || 0,
              staff.support_accountant_count || 0,
              staff.support_library_staff_count || 0,
              staff.support_drawing_staff_count || 0,
              staff.support_pet_staff_count || 0,
              staff.support_others_count || 0,
            ], 'staff_summary');
            console.log('[Staff] ✅ Staff summary saved successfully');
          } else {
            console.log('[Staff] ❌ No staff summary found in request. Skipping staff summary save.');
          }

          // 4. Save Non-Teaching Staff
          console.log('[Staff] data.staff.nonTeaching exists?', !!data.staff?.nonTeaching);
          // Always save non-teaching staff if it exists (even if all values are 0)
          if (data.staff && data.staff.nonTeaching) {
            const nonTeach = data.staff.nonTeaching;
            const nonTeachSql = `
              INSERT INTO non_teaching_staff_summary (
                school_mobile_no,
                oa_count, driver_vehicle_helper_count, watchman_count, aaya_count, sweeper_count, others_count
              )
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                oa_count = excluded.oa_count,
                driver_vehicle_helper_count = excluded.driver_vehicle_helper_count,
                watchman_count = excluded.watchman_count,
                aaya_count = excluded.aaya_count,
                sweeper_count = excluded.sweeper_count,
                others_count = excluded.others_count,
                updated_at = datetime('now')
            `;
            
            runSQL(nonTeachSql, [
              mobile,
              nonTeach.oa_count || 0,
              nonTeach.driver_vehicle_helper_count || 0,
              nonTeach.watchman_count || 0,
              nonTeach.aaya_count || 0,
              nonTeach.sweeper_count || 0,
              nonTeach.others_count || 0,
            ], 'non_teaching_staff_summary');
            console.log('[Staff] ✅ Non-teaching staff saved successfully');
          } else {
            console.log('[Staff] ❌ No non-teaching staff found in request. Skipping non-teaching staff save.');
          }

          // 5. Save Students (multi-row - delete then insert)
          console.log('[Staff] data.staff.students exists?', !!data.staff?.students);
          console.log('[Staff] data.staff.students is array?', Array.isArray(data.staff?.students));
          console.log('[Staff] data.staff.students length?', data.staff?.students?.length);
          if (data.staff?.students && Array.isArray(data.staff.students) && data.staff.students.length > 0) {
            console.log('[Staff] ✅ Saving students data. Count:', data.staff.students.length);
            console.log('[Staff] Students data:', JSON.stringify(data.staff.students, null, 2));
            runSQL('DELETE FROM class_wise_student_strength WHERE school_mobile_no = ?', [mobile], 'class_wise_student_strength (delete)');
            
            const studentSql = `INSERT INTO class_wise_student_strength (school_mobile_no, class_name, boys_count, girls_count, rte_count, emis_upload_path) VALUES (?, ?, ?, ?, ?, ?)`;
            
            for (const student of data.staff.students) {
              if (student.class_name) {
                console.log('[Staff] Inserting student:', student.class_name, 'boys:', student.boys_count, 'girls:', student.girls_count);
                runSQL(studentSql, [
                  mobile,
                  student.class_name,
                  student.boys_count || 0,
                  student.girls_count || 0,
                  student.rte_count || 0,
                  student.emis_upload_path || null,
                ], 'class_wise_student_strength');
              }
            }
            console.log('[Staff] ✅ Students data saved successfully');
          } else {
            console.log('[Staff] ❌ No students data found in request. Skipping students save.');
            console.log('[Staff] Students data:', data.staff?.students);
          }

          // 6. Save Infrastructure
          console.log('[Infrastructure] Checking for infrastructure data. data.infrastructure exists?', !!data.infrastructure);
          console.log('[Infrastructure] data.infrastructure.main exists?', !!data.infrastructure?.main);
          // Always save infrastructure main if it exists (even if all values are null/0)
          if (data.infrastructure && data.infrastructure.main) {
            const infra = data.infrastructure.main;
            const infraSql = `
              INSERT INTO school_infrastructure (
                school_mobile_no, school_location_type,
                total_land_acres, total_land_sqft, is_land_sufficient_as_per_norms, land_sufficient_details,
                is_land_contiguous, land_non_contiguous_distance_details,
                land_ownership_type, lease_years,
                num_buildings_blocks,
                unapproved_building_regularisation_steps, regularisation_fee_paid_rs, regularisation_date_of_remittance,
                is_classrooms_commensurate, classroom_size_sqft, classroom_photo_path,
                toilets_boys_count, toilets_boys_photo_path, toilets_girls_count, toilets_girls_photo_path, is_toilets_separate_boys_girls,
                drinking_water_taps_count, drinking_water_photo_path, hand_wash_taps_count, hand_wash_photo_path
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                school_location_type = excluded.school_location_type,
                total_land_acres = excluded.total_land_acres,
                total_land_sqft = excluded.total_land_sqft,
                is_land_sufficient_as_per_norms = excluded.is_land_sufficient_as_per_norms,
                land_sufficient_details = excluded.land_sufficient_details,
                is_land_contiguous = excluded.is_land_contiguous,
                land_non_contiguous_distance_details = excluded.land_non_contiguous_distance_details,
                land_ownership_type = excluded.land_ownership_type,
                lease_years = excluded.lease_years,
                num_buildings_blocks = excluded.num_buildings_blocks,
                unapproved_building_regularisation_steps = excluded.unapproved_building_regularisation_steps,
                regularisation_fee_paid_rs = excluded.regularisation_fee_paid_rs,
                regularisation_date_of_remittance = excluded.regularisation_date_of_remittance,
                is_classrooms_commensurate = excluded.is_classrooms_commensurate,
                classroom_size_sqft = excluded.classroom_size_sqft,
                classroom_photo_path = excluded.classroom_photo_path,
                toilets_boys_count = excluded.toilets_boys_count,
                toilets_boys_photo_path = excluded.toilets_boys_photo_path,
                toilets_girls_count = excluded.toilets_girls_count,
                toilets_girls_photo_path = excluded.toilets_girls_photo_path,
                is_toilets_separate_boys_girls = excluded.is_toilets_separate_boys_girls,
                drinking_water_taps_count = excluded.drinking_water_taps_count,
                drinking_water_photo_path = excluded.drinking_water_photo_path,
                hand_wash_taps_count = excluded.hand_wash_taps_count,
                hand_wash_photo_path = excluded.hand_wash_photo_path,
                updated_at = datetime('now')
            `;
            
            runSQL(infraSql, [
              mobile,
              infra.school_location_type || null,
              infra.total_land_acres || null,
              infra.total_land_sqft || null,
              infra.is_land_sufficient_as_per_norms ? 1 : 0,
              infra.land_sufficient_details || null,
              infra.is_land_contiguous !== false ? 1 : 0,
              infra.land_non_contiguous_distance_details || null,
              infra.land_ownership_type || null,
              infra.lease_years || null,
              infra.num_buildings_blocks || 0,
              infra.unapproved_building_regularisation_steps || null,
              infra.regularisation_fee_paid_rs || null,
              infra.regularisation_date_of_remittance || null,
              infra.is_classrooms_commensurate ? 1 : 0,
              infra.classroom_size_sqft || null,
              infra.classroom_photo_path || null,
              infra.toilets_boys_count || 0,
              infra.toilets_boys_photo_path || null,
              infra.toilets_girls_count || 0,
              infra.toilets_girls_photo_path || null,
              infra.is_toilets_separate_boys_girls ? 1 : 0,
              infra.drinking_water_taps_count || 0,
              infra.drinking_water_photo_path || null,
              infra.hand_wash_taps_count || 0,
              infra.hand_wash_photo_path || null,
            ], 'school_infrastructure');
            console.log('[Infrastructure] ✅ Infrastructure main saved successfully');
          } else {
            console.log('[Infrastructure] ❌ No infrastructure main found in request. Skipping infrastructure save.');
          }

          // 7. Save Building Blocks (multi-row)
          console.log('[Infrastructure] data.infrastructure.blocks exists?', !!data.infrastructure?.blocks);
          console.log('[Infrastructure] data.infrastructure.blocks is array?', Array.isArray(data.infrastructure?.blocks));
          console.log('[Infrastructure] data.infrastructure.blocks length?', data.infrastructure?.blocks?.length);
          if (data.infrastructure && data.infrastructure.blocks && Array.isArray(data.infrastructure.blocks) && data.infrastructure.blocks.length > 0) {
            console.log('[Infrastructure] ✅ Saving building blocks. Count:', data.infrastructure.blocks.length);
            runSQL('DELETE FROM school_building_blocks WHERE school_mobile_no = ?', [mobile], 'school_building_blocks (delete)');
            
            const blockSql = `INSERT INTO school_building_blocks (school_mobile_no, block_no, year_of_construction, number_of_floors, is_building_plan_approved, approval_details, approval_order_copy_path) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
            for (const block of data.infrastructure.blocks) {
              if (block.block_no !== undefined && block.block_no !== null) {
                console.log('[Infrastructure] Inserting block:', block.block_no);
                runSQL(blockSql, [
                  mobile,
                  block.block_no,
                  block.year_of_construction || null,
                  block.number_of_floors || 0,
                  block.is_building_plan_approved ? 1 : 0,
                  block.approval_details || null,
                  block.approval_order_copy_path || null,
                ], 'school_building_blocks');
              }
            }
            console.log('[Infrastructure] ✅ Building blocks saved successfully');
          } else {
            console.log('[Infrastructure] ❌ No building blocks found in request. Skipping building blocks save.');
          }

          // 8. Save Certificates (multi-row)
          console.log('[Infrastructure] data.infrastructure.certificates exists?', !!data.infrastructure?.certificates);
          console.log('[Infrastructure] data.infrastructure.certificates is array?', Array.isArray(data.infrastructure?.certificates));
          console.log('[Infrastructure] data.infrastructure.certificates length?', data.infrastructure?.certificates?.length);
          if (data.infrastructure && data.infrastructure.certificates && Array.isArray(data.infrastructure.certificates) && data.infrastructure.certificates.length > 0) {
            console.log('[Infrastructure] ✅ Saving certificates. Count:', data.infrastructure.certificates.length);
            runSQL('DELETE FROM school_certificates WHERE school_mobile_no = ?', [mobile], 'school_certificates (delete)');
            
            const certSql = `INSERT INTO school_certificates (school_mobile_no, certificate_type, certificate_no, date_authority, persons_accommodated, certificate_document_path) VALUES (?, ?, ?, ?, ?, ?)`;
            
            for (const cert of data.infrastructure.certificates) {
              if (cert.certificate_type) {
                console.log('[Infrastructure] Inserting certificate:', cert.certificate_type);
                runSQL(certSql, [
                  mobile,
                  cert.certificate_type,
                  cert.certificate_no || null,
                  cert.date_authority || null,
                  cert.persons_accommodated || null,
                  cert.certificate_document_path || null,
                ], 'school_certificates');
              }
            }
            console.log('[Infrastructure] ✅ Certificates saved successfully');
          } else {
            console.log('[Infrastructure] ❌ No certificates found in request. Skipping certificates save.');
          }

          // 9. Save Fees Fixation
          if (data.fees?.feesFixation) {
            const fees = data.fees.feesFixation;
            const feesSql = `
              INSERT INTO fees_fixation_details (
                school_mobile_no, has_fees_fixation_order, fees_fixation_order_path,
                pta_consulted_during_fixation, pta_consultation_details, fees_collected_by_school, fees_fixed_by_committee
              )
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                has_fees_fixation_order = excluded.has_fees_fixation_order,
                fees_fixation_order_path = excluded.fees_fixation_order_path,
                pta_consulted_during_fixation = excluded.pta_consulted_during_fixation,
                pta_consultation_details = excluded.pta_consultation_details,
                fees_collected_by_school = excluded.fees_collected_by_school,
                fees_fixed_by_committee = excluded.fees_fixed_by_committee,
                updated_at = datetime('now')
            `;
            
            runSQL(feesSql, [
              mobile,
              fees.has_fees_fixation_order ? 1 : 0,
              fees.fees_fixation_order_path || null,
              fees.pta_consulted_during_fixation ? 1 : 0,
              fees.pta_consultation_details || null,
              fees.fees_collected_by_school || null,
              fees.fees_fixed_by_committee || null,
            ], 'fees_fixation_details');
          }

          // 10. Save Expenses (multi-row)
          if (data.fees?.expenses && Array.isArray(data.fees.expenses)) {
            runSQL('DELETE FROM class_level_expenses WHERE school_mobile_no = ?', [mobile], 'class_level_expenses (delete)');
            
            const expenseSql = `INSERT INTO class_level_expenses (school_mobile_no, expense_category, class_level, amount) VALUES (?, ?, ?, ?)`;
            
            for (const expense of data.fees.expenses) {
              if (expense.expense_category && expense.class_level) {
                runSQL(expenseSql, [
                  mobile,
                  expense.expense_category,
                  expense.class_level,
                  expense.amount || 0,
                ], 'class_level_expenses');
              }
            }
          }

          // 11. Save Vehicles
          if (data.fees?.vehicles) {
            const vehicles = data.fees.vehicles;
            const vehiclesSql = `
              INSERT INTO school_vehicles (
                school_mobile_no, number_of_vans, number_of_buses, other_vehicles_count
              )
              VALUES (?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                number_of_vans = excluded.number_of_vans,
                number_of_buses = excluded.number_of_buses,
                other_vehicles_count = excluded.other_vehicles_count,
                updated_at = datetime('now')
            `;
            
            runSQL(vehiclesSql, [
              mobile,
              vehicles.number_of_vans || 0,
              vehicles.number_of_buses || 0,
              vehicles.other_vehicles_count || 0,
            ], 'school_vehicles');
          }

          // 12. Save Other Compliance
          if (data.fees?.others) {
            const others = data.fees.others;
            const othersSql = `
              INSERT INTO school_other_compliance_details (
                school_mobile_no, last_year_auditing_filed, last_3_years_audit_status,
                has_health_care_center, health_care_details,
                social_awareness_program_conducted, social_awareness_details,
                social_service_program_conducted, social_services_details,
                salary_processed_through_ecs, declaration_accepted
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(school_mobile_no) DO UPDATE SET
                last_year_auditing_filed = excluded.last_year_auditing_filed,
                last_3_years_audit_status = excluded.last_3_years_audit_status,
                has_health_care_center = excluded.has_health_care_center,
                health_care_details = excluded.health_care_details,
                social_awareness_program_conducted = excluded.social_awareness_program_conducted,
                social_awareness_details = excluded.social_awareness_details,
                social_service_program_conducted = excluded.social_service_program_conducted,
                social_services_details = excluded.social_services_details,
                salary_processed_through_ecs = excluded.salary_processed_through_ecs,
                declaration_accepted = excluded.declaration_accepted,
                updated_at = datetime('now')
            `;
            
            runSQL(othersSql, [
              mobile,
              others.last_year_auditing_filed ? 1 : 0,
              others.last_3_years_audit_status || null,
              others.has_health_care_center ? 1 : 0,
              others.health_care_details || null,
              others.social_awareness_program_conducted ? 1 : 0,
              others.social_awareness_details || null,
              others.social_service_program_conducted ? 1 : 0,
              others.social_services_details || null,
              others.salary_processed_through_ecs ? 1 : 0,
              others.declaration_accepted ? 1 : 0,
            ], 'school_other_compliance_details');
          }

      return { success: true };
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  });

  try {
    const result = transaction();
    
    // Checkpoint WAL to merge changes into main database
    checkpoint();
    
    return result;
  } catch (error) {
    // Transaction failed, don't checkpoint
    throw error;
  }
}
