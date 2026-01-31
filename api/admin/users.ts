import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';
import { getAuthUser, hasRole, hashPassword } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = getAuthUser(req);
  if (!user || !hasRole(user, 'super_admin')) {
    return res.status(403).json({ ok: false, error: 'Access denied. Super admin role required.' });
  }

  if (req.method === 'GET') {
    return getUsers(res);
  } else if (req.method === 'POST') {
    return createUser(req, res);
  } else if (req.method === 'PUT') {
    return updateUser(req, res);
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}

async function getUsers(res: VercelResponse) {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, mobile, name, role, district, is_active, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ ok: true, data: users || [] });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}

async function createUser(req: VercelRequest, res: VercelResponse) {
  const { mobile, password, name, role, district } = req.body;

  if (!mobile || !password || !name || !role) {
    return res.status(400).json({ ok: false, error: 'Mobile, password, name, and role are required' });
  }

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ ok: false, error: 'Role must be admin or user' });
  }

  if (role === 'admin' && !district) {
    return res.status(400).json({ ok: false, error: 'District is required for admin role' });
  }

  try {
    const password_hash = await hashPassword(password);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({ mobile, password_hash, name, role, district: district || null })
      .select('id, mobile, name, role, district, is_active')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ ok: false, error: 'User with this mobile already exists' });
      }
      throw error;
    }

    return res.status(201).json({ ok: true, data: newUser });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}

async function updateUser(req: VercelRequest, res: VercelResponse) {
  const { id, name, role, district, is_active, password } = req.body;

  if (!id) {
    return res.status(400).json({ ok: false, error: 'User ID is required' });
  }

  try {
    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (district !== undefined) updates.district = district;
    if (is_active !== undefined) updates.is_active = is_active;
    if (password) updates.password_hash = await hashPassword(password);

    const { data: updated, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, mobile, name, role, district, is_active')
      .single();

    if (error) throw error;

    return res.status(200).json({ ok: true, data: updated });
  } catch (error: any) {
    return res.status(500).json({ ok: false, error: 'Server error: ' + error.message });
  }
}
