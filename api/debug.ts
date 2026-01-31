import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const checks: Record<string, any> = {};

  // Test 1: env vars
  checks.envVars = {
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: !!process.env.JWT_SECRET,
  };

  // Test 2: import supabase client lib
  try {
    const mod = await import('./_lib/supabase.js');
    checks.supabaseLib = { ok: true, keys: Object.keys(mod) };
  } catch (e: any) {
    checks.supabaseLib = { error: e.message };
  }

  // Test 3: import auth lib
  try {
    const mod = await import('./_lib/auth.js');
    checks.authLib = { ok: true, keys: Object.keys(mod) };
  } catch (e: any) {
    checks.authLib = { error: e.message };
  }

  // Test 4: direct npm package imports
  try {
    await import('@supabase/supabase-js');
    checks.supabasePkg = true;
  } catch (e: any) {
    checks.supabasePkg = { error: e.message };
  }

  try {
    await import('jsonwebtoken');
    checks.jwtPkg = true;
  } catch (e: any) {
    checks.jwtPkg = { error: e.message };
  }

  try {
    await import('bcryptjs');
    checks.bcryptPkg = true;
  } catch (e: any) {
    checks.bcryptPkg = { error: e.message };
  }

  return res.status(200).json({ checks });
}
