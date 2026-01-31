import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. ' +
    'Add them in Vercel Dashboard → Settings → Environment Variables.'
  );
}

// Server-side Supabase client with service role (full access)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const STORAGE_BUCKET = 'school-documents';
