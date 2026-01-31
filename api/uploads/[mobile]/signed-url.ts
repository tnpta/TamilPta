import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, STORAGE_BUCKET } from '../../../lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { mobile } = req.query;
  const mobileStr = Array.isArray(mobile) ? mobile[0] : mobile;

  if (!mobileStr || !/^\d{10}$/.test(mobileStr)) {
    return res.status(400).json({ ok: false, error: 'Invalid mobile number' });
  }

  // GET: Generate download URL for an existing document
  if (req.method === 'GET') {
    const { path } = req.query;
    const pathStr = Array.isArray(path) ? path[0] : path;

    if (!pathStr) {
      return res.status(400).json({ ok: false, error: 'Path is required' });
    }

    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(pathStr, 3600); // 1-hour expiry

      if (error) throw error;

      return res.status(200).json({
        ok: true,
        data: { downloadUrl: data.signedUrl },
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: 'Failed to create download URL: ' + error.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { filename, contentType } = req.body;

  if (!filename) {
    return res.status(400).json({ ok: false, error: 'Filename is required' });
  }

  try {
    const timestamp = Date.now();
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${mobileStr}/${timestamp}-${safeName}`;

    // Create a signed upload URL (valid for 60 seconds)
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUploadUrl(filePath);

    if (error) throw error;

    // Also create a signed download URL (valid for 1 year)
    const { data: downloadData } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 365 * 24 * 60 * 60);

    return res.status(200).json({
      ok: true,
      data: {
        uploadUrl: data.signedUrl,
        token: data.token,
        path: filePath,
        downloadUrl: downloadData?.signedUrl || null,
      },
    });
  } catch (error: any) {
    console.error('Signed URL error:', error);
    return res.status(500).json({ ok: false, error: 'Failed to create upload URL: ' + error.message });
  }
}
