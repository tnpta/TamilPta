import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const [totalRes, submittedRes, districtsRes] = await Promise.all([
      supabase.from('schools').select('*', { count: 'exact', head: true }),
      supabase.from('schools').select('*', { count: 'exact', head: true }).eq('status', 'SUBMITTED'),
      supabase.from('schools').select('district'),
    ]);

    const uniqueDistricts = new Set(
      (districtsRes.data || []).map((d: any) => d.district).filter(Boolean)
    );

    return res.status(200).json({
      ok: true,
      data: {
        totalRegistered: totalRes.count || 0,
        totalSubmitted: submittedRes.count || 0,
        districtCount: uniqueDistricts.size,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
