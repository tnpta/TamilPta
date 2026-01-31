import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  const url = (process.env.SUPABASE_URL || '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  // 1. Check env vars (safe info only)
  checks.SUPABASE_URL_length = url.length;
  checks.SUPABASE_URL_prefix = url.substring(0, 20);
  checks.SUPABASE_SERVICE_ROLE_KEY_length = key.length;
  checks.JWT_SECRET = !!process.env.JWT_SECRET;

  // 2. Direct fetch test to Supabase REST API
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
    });
    checks.directFetch = { status: response.status, statusText: response.statusText };
  } catch (e: any) {
    checks.directFetch = { error: e.message, cause: e.cause?.message || null };
  }

  // 3. Try supabase client query
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(url, key);
    const { data, error } = await client.from('users').select('id').limit(1);
    checks.supabaseQuery = error ? { error: error.message, code: error.code, details: error.details } : { ok: true, rows: data?.length };
  } catch (e: any) {
    checks.supabaseClientError = e.message;
  }

  return res.status(200).json({ checks });
}
