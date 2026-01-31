import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  // 1. Test importing lib/supabase (same as login.ts does)
  try {
    const { supabase } = await import('../lib/supabase');
    checks.libSupabase = 'imported ok';
    const { data, error } = await supabase.from('users').select('id, mobile, role').limit(1);
    checks.usersQuery = error ? { error: error.message } : { ok: true, rows: data };
  } catch (e: any) {
    checks.libSupabase = { error: e.message, stack: e.stack?.split('\n').slice(0, 5) };
  }

  // 2. Test importing lib/auth (same as login.ts does)
  try {
    const { comparePassword, signToken } = await import('../lib/auth');
    checks.libAuth = 'imported ok';
    checks.signToken = typeof signToken === 'function';
    checks.comparePassword = typeof comparePassword === 'function';
  } catch (e: any) {
    checks.libAuth = { error: e.message, stack: e.stack?.split('\n').slice(0, 5) };
  }

  return res.status(200).json({ checks });
}
