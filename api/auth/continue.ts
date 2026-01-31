import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { mobile } = req.body;

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ ok: false, error: 'Invalid mobile number. Must be 10 digits.' });
  }

  try {
    const { data, error } = await supabase
      .from('schools')
      .select('school_mobile_no')
      .eq('school_mobile_no', mobile)
      .limit(1);

    if (error) throw error;

    const isExisting = data && data.length > 0;

    return res.status(200).json({
      ok: true,
      data: { isExisting, mobile },
    });
  } catch (error: any) {
    console.error('Auth continue error:', error);
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
