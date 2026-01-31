const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Demo mode: no backend configured and not on localhost
const DEMO_MODE = !import.meta.env.VITE_API_URL
  && typeof window !== 'undefined'
  && window.location.hostname !== 'localhost'
  && !document.querySelector('meta[name="has-api"]');

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// ========================
// Auth
// ========================

export async function checkSchoolExists(mobile: string): Promise<ApiResponse<{ isExisting: boolean; mobile: string }>> {
  if (DEMO_MODE) {
    return { ok: true, data: { isExisting: false, mobile }, message: 'Demo mode' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/continue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      return { ok: false, error: `Server returned non-JSON: ${contentType}. ${text.substring(0, 200)}` };
    }

    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function loginUser(mobile: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, password }),
    });
    const data = await response.json();

    if (data.ok && data.data?.token) {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.data.user));
    }
    return data;
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function registerUser(mobile: string, password: string, name: string): Promise<ApiResponse<{ token: string; user: any }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, password, name }),
    });
    const data = await response.json();

    if (data.ok && data.data?.token) {
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.data.user));
    }
    return data;
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}

export function getStoredUser(): { mobile: string; name: string; role: string; district?: string } | null {
  try {
    const json = localStorage.getItem('auth_user');
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('auth_token');
}

// ========================
// School Data
// ========================

export async function getSchoolFullData(mobile: string): Promise<ApiResponse> {
  if (DEMO_MODE) {
    return { ok: true, data: {}, message: 'Demo mode' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/full`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function saveDraft(mobile: string, data: any): Promise<ApiResponse> {
  if (DEMO_MODE) {
    return { ok: true, message: 'Demo mode - draft not saved' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/draft`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function submitForm(mobile: string, data: any): Promise<ApiResponse> {
  if (DEMO_MODE) {
    return { ok: true, message: 'Demo mode - form submitted (not saved)' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/submit`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// ========================
// File Uploads
// ========================

export async function uploadDocument(mobile: string, file: File): Promise<ApiResponse<{ filename: string; path: string }>> {
  if (DEMO_MODE) {
    return { ok: true, data: { filename: file.name, path: `demo/${file.name}` }, message: 'Demo mode' };
  }

  try {
    // Step 1: Get signed upload URL from our API
    const urlResponse = await fetch(`${API_BASE_URL}/uploads/${mobile}/signed-url`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    const urlData = await urlResponse.json();
    if (!urlData.ok) {
      return { ok: false, error: urlData.error || 'Failed to get upload URL' };
    }

    // Step 2: Upload file directly to Supabase Storage
    const uploadResponse = await fetch(urlData.data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!uploadResponse.ok) {
      return { ok: false, error: 'File upload failed' };
    }

    return {
      ok: true,
      data: {
        filename: file.name,
        path: urlData.data.path,
      },
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Upload failed' };
  }
}

// ========================
// Admin APIs
// ========================

export async function getAdminSchools(params?: {
  status?: string;
  district?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.district) searchParams.set('district', params.district);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));

    const response = await fetch(`${API_BASE_URL}/admin/schools?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function getAdminUsers(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function createAdminUser(userData: {
  mobile: string;
  password: string;
  name: string;
  role: string;
  district?: string;
}): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function updateAdminUser(userData: {
  id: number;
  name?: string;
  role?: string;
  district?: string;
  is_active?: boolean;
  password?: string;
}): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}
