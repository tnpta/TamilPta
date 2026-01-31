import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  // 1. Check env vars exist (don't reveal values)
  checks.SUPABASE_URL = !!process.env.SUPABASE_URL;
  checks.SUPABASE_SERVICE_ROLE_KEY = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  checks.JWT_SECRET = !!process.env.JWT_SECRET;

  // 2. Try importing supabase client
  try {
    const { createClient } = await import('@supabase/supabase-js');
    checks.supabaseImport = true;

    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      // 3. Try a simple query
      const { data, error } = await client.from('users').select('id').limit(1);
      checks.supabaseQuery = error ? { error: error.message, code: error.code } : { ok: true, rows: data?.length };
    }
  } catch (e: any) {
    checks.supabaseImport = false;
    checks.importError = e.message;
  }

  // 4. Try importing other deps
  try {
    await import('jsonwebtoken');
    checks.jwtImport = true;
  } catch (e: any) {
    checks.jwtImport = false;
    checks.jwtError = e.message;
  }

  try {
    await import('bcryptjs');
    checks.bcryptImport = true;
  } catch (e: any) {
    checks.bcryptImport = false;
    checks.bcryptError = e.message;
  }

  return res.status(200).json({ checks });
}
