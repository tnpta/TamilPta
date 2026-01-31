import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { VercelRequest } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

export interface JWTPayload {
  userId: number;
  mobile: string;
  role: 'super_admin' | 'admin' | 'user';
  district?: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Extract and verify JWT from Authorization header.
 * Returns null if no token or invalid token.
 */
export function getAuthUser(req: VercelRequest): JWTPayload | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.split(' ')[1];
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Require authentication. Returns user or sends 401 response.
 */
export function requireAuth(req: VercelRequest): JWTPayload | null {
  return getAuthUser(req);
}

/**
 * Check if user has one of the allowed roles.
 */
export function hasRole(user: JWTPayload, ...roles: string[]): boolean {
  return roles.includes(user.role);
}
