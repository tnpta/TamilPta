import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../_lib/supabase';
import { getAuthUser, hasRole } from '../../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { mobile } = req.query;
  const mobileStr = Array.isArray(mobile) ? mobile[0] : mobile;

  if (!mobileStr || !/^\d{10}$/.test(mobileStr)) {
    return res.status(400).json({ ok: false, error: 'Invalid mobile number' });
  }

  // Auth check: user can only access own data, admin/super_admin can access all
  const user = getAuthUser(req);
  if (user && !hasRole(user, 'super_admin', 'admin') && user.mobile !== mobileStr) {
    return res.status(403).json({ ok: false, error: 'Access denied' });
  }

  try {
    const [
      { data: basic },
      { data: trust },
      { data: staffSummary },
      { data: nonTeaching },
      { data: students },
      { data: infraMain },
      { data: blocks },
      { data: certificates },
      { data: feesFixation },
      { data: vehicles },
      { data: others },
    ] = await Promise.all([
      supabase.from('schools').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('trust_management_details').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('staff_summary').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('non_teaching_staff_summary').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('class_wise_student_strength').select('*').eq('school_mobile_no', mobileStr),
      supabase.from('school_infrastructure').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('school_building_blocks').select('*').eq('school_mobile_no', mobileStr).order('block_no'),
      supabase.from('school_certificates').select('*').eq('school_mobile_no', mobileStr),
      supabase.from('fees_fixation_details').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('school_vehicles').select('*').eq('school_mobile_no', mobileStr).single(),
      supabase.from('school_other_compliance_details').select('*').eq('school_mobile_no', mobileStr).single(),
    ]);

    return res.status(200).json({
      ok: true,
      data: {
        basic: basic || null,
        trust: trust || null,
        staff: {
          summary: staffSummary || null,
          nonTeaching: nonTeaching || null,
          students: students || [],
        },
        infrastructure: {
          main: infraMain || null,
          blocks: blocks || [],
          certificates: certificates || [],
        },
        fees: {
          feesFixation: feesFixation || null,
          vehicles: vehicles || null,
          others: others || null,
        },
      },
    });
  } catch (error: any) {
    console.error('Fetch school data error:', error);
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
