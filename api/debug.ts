import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';
import { comparePassword, hashPassword } from './_lib/auth.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  // Get the stored hash for the super admin user
  const { data: user } = await supabase
    .from('users')
    .select('id, mobile, password_hash, role')
    .eq('mobile', '9999999999')
    .single();

  if (user) {
    checks.user = { id: user.id, mobile: user.mobile, role: user.role };
    checks.hashPrefix = user.password_hash?.substring(0, 10);
    checks.hashLength = user.password_hash?.length;

    // Test if 'admin123' matches the stored hash
    try {
      const matches = await comparePassword('admin123', user.password_hash);
      checks.passwordMatch = matches;
    } catch (e: any) {
      checks.passwordError = e.message;
    }

    // Generate correct hash for 'admin123'
    const correctHash = await hashPassword('admin123');
    checks.correctHash = correctHash;
  } else {
    checks.user = 'not found';
  }

  return res.status(200).json({ checks });
}
