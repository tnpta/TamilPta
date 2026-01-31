import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase';
import { comparePassword, signToken } from './_lib/auth';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  // 1. Test supabase connection
  try {
    const { data, error } = await supabase.from('users').select('id, mobile, role').limit(1);
    checks.supabase = error ? { error: error.message } : { ok: true, rows: data };
  } catch (e: any) {
    checks.supabase = { error: e.message };
  }

  // 2. Test auth functions
  checks.signToken = typeof signToken === 'function';
  checks.comparePassword = typeof comparePassword === 'function';

  return res.status(200).json({ checks });
}
