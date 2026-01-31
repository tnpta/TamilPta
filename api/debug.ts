import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  checks.envVars = {
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: !!process.env.JWT_SECRET,
  };

  try {
    const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });
    checks.database = error ? { error: error.message } : { ok: true, userCount: count };
  } catch (e: any) {
    checks.database = { error: e.message };
  }

  return res.status(200).json({ ok: true, checks });
}
