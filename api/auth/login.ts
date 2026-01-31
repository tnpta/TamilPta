import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase';
import { comparePassword, signToken } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ ok: false, error: 'Mobile and password are required' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('mobile', mobile)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return res.status(401).json({ ok: false, error: 'Invalid mobile number or password' });
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ ok: false, error: 'Invalid mobile number or password' });
    }

    const token = signToken({
      userId: user.id,
      mobile: user.mobile,
      role: user.role,
      district: user.district,
    });

    return res.status(200).json({
      ok: true,
      data: {
        token,
        user: {
          id: user.id,
          mobile: user.mobile,
          name: user.name,
          role: user.role,
          district: user.district,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
