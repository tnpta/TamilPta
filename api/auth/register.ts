import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';
import { hashPassword, signToken } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { mobile, password, name } = req.body;

  if (!mobile || !password || !name) {
    return res.status(400).json({ ok: false, error: 'Mobile, password, and name are required' });
  }

  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ ok: false, error: 'Invalid mobile number. Must be 10 digits.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ ok: false, error: 'Password must be at least 6 characters' });
  }

  try {
    // Check if user already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('mobile', mobile)
      .single();

    if (existing) {
      return res.status(409).json({ ok: false, error: 'An account with this mobile number already exists' });
    }

    const password_hash = await hashPassword(password);

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        mobile,
        password_hash,
        name,
        role: 'user',
      })
      .select('id, mobile, name, role, district')
      .single();

    if (error) throw error;

    const token = signToken({
      userId: user.id,
      mobile: user.mobile,
      role: user.role,
      district: user.district,
    });

    return res.status(201).json({
      ok: true,
      data: { token, user },
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
