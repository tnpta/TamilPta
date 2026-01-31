import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';
import { getAuthUser, hasRole } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const user = getAuthUser(req);
  if (!user || !hasRole(user, 'super_admin', 'admin')) {
    return res.status(403).json({ ok: false, error: 'Access denied. Admin role required.' });
  }

  try {
    const { status, district, page = '1', limit = '50' } = req.query;
    const pageNum = parseInt(Array.isArray(page) ? page[0] : page, 10) || 1;
    const limitNum = Math.min(parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 50, 100);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from('schools')
      .select('school_mobile_no, school_name, school_code, district, status, created_at, updated_at', { count: 'exact' });

    // Admin can only see schools in their district
    if (user.role === 'admin' && user.district) {
      query = query.eq('district', user.district);
    }

    // Filter by status
    if (status) {
      const statusStr = Array.isArray(status) ? status[0] : status;
      query = query.eq('status', statusStr);
    }

    // Filter by district (super_admin can filter any district)
    if (district && user.role === 'super_admin') {
      const districtStr = Array.isArray(district) ? district[0] : district;
      query = query.eq('district', districtStr);
    }

    const { data: schools, count, error } = await query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) throw error;

    return res.status(200).json({
      ok: true,
      data: {
        schools: schools || [],
        total: count || 0,
        page: pageNum,
        limit: limitNum,
      },
    });
  } catch (error: any) {
    console.error('Admin schools error:', error);
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
