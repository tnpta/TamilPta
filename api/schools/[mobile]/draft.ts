import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { mobile } = req.query;
  const mobileStr = Array.isArray(mobile) ? mobile[0] : mobile;

  if (!mobileStr || !/^\d{10}$/.test(mobileStr)) {
    return res.status(400).json({ ok: false, error: 'Invalid mobile number' });
  }

  const data = req.body;

  try {
    await saveSchoolData(mobileStr, data, false);
    return res.status(200).json({ ok: true, message: 'Draft saved successfully', mobile: mobileStr });
  } catch (error: any) {
    console.error('Save draft error:', error);
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}

async function saveSchoolData(mobile: string, data: any, isSubmit: boolean) {
  // 1. Basic Info
  if (data.basic) {
    const basic = data.basic;
    await supabase.from('schools').upsert({
      school_mobile_no: mobile,
      school_code: basic.school_code || null,
      school_name: basic.school_name || null,
      school_address: basic.school_address || null,
      taluk: basic.taluk || null,
      locality: basic.locality || null,
      pin_code: basic.pin_code || null,
      school_whatsapp_no: basic.school_whatsapp_no || null,
      school_email_id: basic.school_email_id || null,
      school_type: basic.school_type || null,
      correspondent_title: basic.correspondent_title || null,
      correspondent_name: basic.correspondent_name || null,
      correspondent_mobile_no: basic.correspondent_mobile_no || null,
      correspondent_whatsapp_no: basic.correspondent_whatsapp_no || null,
      correspondent_email_id: basic.correspondent_email_id || null,
      principal_title: basic.principal_title || null,
      principal_name: basic.principal_name || null,
      principal_mobile_no: basic.principal_mobile_no || null,
      principal_whatsapp_no: basic.principal_whatsapp_no || null,
      principal_email_id: basic.principal_email_id || null,
      district: basic.district || null,
      status: isSubmit ? 'SUBMITTED' : 'DRAFT',
    }, { onConflict: 'school_mobile_no' });
  }

  // 2. Trust Management
  if (data.trust) {
    const t = data.trust;
    await supabase.from('trust_management_details').upsert({
      school_mobile_no: mobile,
      trust_name: t.trust_name || null,
      organization_type: t.organization_type || null,
      registration_date: t.registration_date || null,
      registration_number: t.registration_number || null,
      renewal_details: t.renewal_details || null,
      trust_document_path: t.trust_document_path || null,
      chairman_title: t.chairman_title || null,
      chairman_name: t.chairman_name || null,
      chairman_mobile_no: t.chairman_mobile_no || null,
      chairman_whatsapp_no: t.chairman_whatsapp_no || null,
      chairman_email_id: t.chairman_email_id || null,
      secretary_title: t.secretary_title || null,
      secretary_name: t.secretary_name || null,
      secretary_mobile_no: t.secretary_mobile_no || null,
      secretary_whatsapp_no: t.secretary_whatsapp_no || null,
      secretary_email_id: t.secretary_email_id || null,
      year_of_establishment: t.year_of_establishment || null,
      classes_at_establishment: t.classes_at_establishment || null,
      opening_order_no: t.opening_order_no || null,
      rc_no: t.rc_no || null,
      rc_date: t.rc_date || null,
      additional_classes_details: t.additional_classes_details || null,
      additional_classes_order_path: t.additional_classes_order_path || null,
      latest_renewal_details: t.latest_renewal_details || null,
      latest_renewal_order_path: t.latest_renewal_order_path || null,
      first_board_exam_10_year: t.first_board_exam_10_year || null,
      first_board_exam_12_year: t.first_board_exam_12_year || null,
      classes_from: t.classes_from || null,
      classes_to: t.classes_to || null,
      is_pta_formed: !!t.is_pta_formed,
      pta_affiliation_payment_details: t.pta_affiliation_payment_details || null,
    }, { onConflict: 'school_mobile_no' });
  }

  // 3. Staff Summary
  if (data.staff?.summary) {
    const s = data.staff.summary;
    await supabase.from('staff_summary').upsert({
      school_mobile_no: mobile,
      teaching_pg_count: s.teaching_pg_count || 0,
      teaching_ug_count: s.teaching_ug_count || 0,
      teaching_sgt_count: s.teaching_sgt_count || 0,
      teaching_bed_count: s.teaching_bed_count || 0,
      teaching_med_count: s.teaching_med_count || 0,
      tet_bed_qualified_count: s.tet_bed_qualified_count || 0,
      tet_sgt_qualified_count: s.tet_sgt_qualified_count || 0,
      support_office_staff_count: s.support_office_staff_count || 0,
      support_accountant_count: s.support_accountant_count || 0,
      support_library_staff_count: s.support_library_staff_count || 0,
      support_drawing_staff_count: s.support_drawing_staff_count || 0,
      support_pet_staff_count: s.support_pet_staff_count || 0,
      support_others_count: s.support_others_count || 0,
    }, { onConflict: 'school_mobile_no' });
  }

  // 4. Non-Teaching Staff
  if (data.staff?.nonTeaching) {
    const n = data.staff.nonTeaching;
    await supabase.from('non_teaching_staff_summary').upsert({
      school_mobile_no: mobile,
      oa_count: n.oa_count || 0,
      driver_vehicle_helper_count: n.driver_vehicle_helper_count || 0,
      watchman_count: n.watchman_count || 0,
      aaya_count: n.aaya_count || 0,
      sweeper_count: n.sweeper_count || 0,
      others_count: n.others_count || 0,
    }, { onConflict: 'school_mobile_no' });
  }

  // 5. Students (multi-row: delete + insert)
  if (data.staff?.students?.length > 0) {
    await supabase.from('class_wise_student_strength').delete().eq('school_mobile_no', mobile);
    const rows = data.staff.students
      .filter((s: any) => s.class_name)
      .map((s: any) => ({
        school_mobile_no: mobile,
        class_name: s.class_name,
        boys_count: s.boys_count || 0,
        girls_count: s.girls_count || 0,
        rte_count: s.rte_count || 0,
        emis_upload_path: s.emis_upload_path || null,
      }));
    if (rows.length > 0) {
      await supabase.from('class_wise_student_strength').insert(rows);
    }
  }

  // 6. Infrastructure
  if (data.infrastructure?.main) {
    const i = data.infrastructure.main;
    await supabase.from('school_infrastructure').upsert({
      school_mobile_no: mobile,
      school_location_type: i.school_location_type || null,
      total_land_acres: i.total_land_acres || null,
      total_land_sqft: i.total_land_sqft || null,
      total_land_ground: i.total_land_ground || null,
      is_land_sufficient_as_per_norms: !!i.is_land_sufficient_as_per_norms,
      land_sufficient_details: i.land_sufficient_details || null,
      is_land_contiguous: i.is_land_contiguous !== false,
      land_non_contiguous_distance_details: i.land_non_contiguous_distance_details || null,
      ht_lines_or_canal: i.ht_lines_or_canal || null,
      land_latitude: i.land_latitude || null,
      land_longitude: i.land_longitude || null,
      land_ownership_type: i.land_ownership_type || null,
      lease_years: i.lease_years || null,
      num_buildings_blocks: i.num_buildings_blocks || 0,
      unapproved_building_regularisation_steps: i.unapproved_building_regularisation_steps || null,
      regularisation_fee_paid_rs: i.regularisation_fee_paid_rs || null,
      regularisation_date_of_remittance: i.regularisation_date_of_remittance || null,
      is_classrooms_commensurate: !!i.is_classrooms_commensurate,
      classroom_size_sqft: i.classroom_size_sqft || null,
      toilets_boys_count: i.toilets_boys_count || 0,
      toilets_girls_count: i.toilets_girls_count || 0,
      is_toilets_separate_boys_girls: !!i.is_toilets_separate_boys_girls,
      drinking_water_taps_count: i.drinking_water_taps_count || 0,
      hand_wash_taps_count: i.hand_wash_taps_count || 0,
      youtube_link: i.youtube_link || null,
      lift_or_ramps: i.lift_or_ramps || null,
      ramp_at_entry: i.ramp_at_entry || null,
      cwsn_toilets: i.cwsn_toilets || null,
      stability_cert_issued_by: i.stability_cert_issued_by || null,
    }, { onConflict: 'school_mobile_no' });
  }

  // 7. Building Blocks (multi-row: delete + insert)
  if (data.infrastructure?.blocks?.length > 0) {
    await supabase.from('school_building_blocks').delete().eq('school_mobile_no', mobile);
    const rows = data.infrastructure.blocks
      .filter((b: any) => b.block_no !== undefined && b.block_no !== null)
      .map((b: any) => ({
        school_mobile_no: mobile,
        block_no: b.block_no,
        year_of_construction: b.year_of_construction || null,
        number_of_floors: b.number_of_floors || 0,
        is_building_plan_approved: !!b.is_building_plan_approved,
        approval_details: b.approval_details || null,
        approval_order_copy_path: b.approval_order_copy_path || null,
        floors_data: b.floors_data || null,
      }));
    if (rows.length > 0) {
      await supabase.from('school_building_blocks').insert(rows);
    }
  }

  // 8. Certificates (multi-row: delete + insert)
  if (data.infrastructure?.certificates?.length > 0) {
    await supabase.from('school_certificates').delete().eq('school_mobile_no', mobile);
    const rows = data.infrastructure.certificates
      .filter((c: any) => c.certificate_type)
      .map((c: any) => ({
        school_mobile_no: mobile,
        certificate_type: c.certificate_type,
        certificate_no: c.certificate_no || null,
        date_authority: c.date_authority || null,
        persons_accommodated: c.persons_accommodated || null,
        certificate_document_path: c.certificate_document_path || null,
      }));
    if (rows.length > 0) {
      await supabase.from('school_certificates').insert(rows);
    }
  }

  // 9. Fees Fixation
  if (data.fees?.feesFixation) {
    const f = data.fees.feesFixation;
    await supabase.from('fees_fixation_details').upsert({
      school_mobile_no: mobile,
      has_fees_fixation_order: !!f.has_fees_fixation_order,
      fees_fixation_order_path: f.fees_fixation_order_path || null,
      pta_consulted_during_fixation: !!f.pta_consulted_during_fixation,
      pta_consultation_details: f.pta_consultation_details || null,
    }, { onConflict: 'school_mobile_no' });
  }

  // 10. Vehicles
  if (data.fees?.vehicles) {
    const v = data.fees.vehicles;
    await supabase.from('school_vehicles').upsert({
      school_mobile_no: mobile,
      number_of_vans: v.number_of_vans || 0,
      number_of_buses: v.number_of_buses || 0,
      other_vehicles_count: v.other_vehicles_count || 0,
    }, { onConflict: 'school_mobile_no' });
  }

  // 11. Other Compliance
  if (data.fees?.others) {
    const o = data.fees.others;
    await supabase.from('school_other_compliance_details').upsert({
      school_mobile_no: mobile,
      has_health_care_center: !!o.has_health_care_center,
      health_care_details: o.health_care_details || null,
      social_awareness_program_conducted: !!o.social_awareness_program_conducted,
      social_awareness_details: o.social_awareness_details || null,
      social_service_program_conducted: !!o.social_service_program_conducted,
      social_services_details: o.social_services_details || null,
      salary_processed_through_ecs: !!o.salary_processed_through_ecs,
      declaration_accepted: !!o.declaration_accepted,
    }, { onConflict: 'school_mobile_no' });
  }
}
