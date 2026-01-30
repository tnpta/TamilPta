// Use relative path in development (Vite proxy) or full URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Mock mode: enabled when no real backend is configured
const MOCK_MODE = !import.meta.env.VITE_API_URL && typeof window !== 'undefined' && window.location.hostname !== 'localhost';

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Check if school exists (dummy OTP validation)
 */
export async function checkSchoolExists(mobile: string): Promise<ApiResponse<{ isExisting: boolean; mobile: string }>> {
  if (MOCK_MODE) {
    return {
      ok: true,
      data: { isExisting: false, mobile },
      message: 'Demo mode - proceeding without backend',
    };
  }

  try {
    const url = `${API_BASE_URL}/auth/continue`;
    console.log('API Call:', url, { mobile });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return {
        ok: false,
        error: `Server returned non-JSON: ${contentType || 'unknown'}. Response: ${text.substring(0, 200)}`,
      };
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('Error response:', text);
      try {
        const json = JSON.parse(text);
        return json;
      } catch {
        return {
          ok: false,
          error: `Server error: ${response.status} ${response.statusText}. Response: ${text.substring(0, 200)}`,
        };
      }
    }

    const text = await response.text();

    if (!text || text.trim() === '') {
      return {
        ok: false,
        error: 'Empty response from server - Backend may not be running or proxy misconfigured',
      };
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        ok: false,
        error: `Invalid JSON response: ${text.substring(0, 200)}. Error: ${error instanceof Error ? error.message : 'Unknown'}`,
      };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error - Backend server may not be running.',
    };
  }
}

/**
 * Fetch all school data
 */
export async function getSchoolFullData(mobile: string): Promise<ApiResponse> {
  if (MOCK_MODE) {
    return {
      ok: true,
      data: {},
      message: 'Demo mode - no saved data',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/full`);

    if (!response.ok) {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return {
          ok: false,
          error: `Server error: ${response.status} ${response.statusText}`,
        };
      }
    }

    const text = await response.text();
    if (!text) {
      return {
        ok: false,
        error: 'Empty response from server',
      };
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        ok: false,
        error: `Invalid JSON response: ${text.substring(0, 100)}`,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error - Backend server may not be running',
    };
  }
}

/**
 * Save draft
 */
export async function saveDraft(mobile: string, data: any): Promise<ApiResponse> {
  if (MOCK_MODE) {
    return { ok: true, message: 'Demo mode - draft not saved' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/draft`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    if (!text) {
      return {
        ok: false,
        error: 'Empty response from server',
      };
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        ok: false,
        error: `Invalid JSON response: ${text.substring(0, 100)}`,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error - Backend server may not be running',
    };
  }
}

/**
 * Submit final form
 */
export async function submitForm(mobile: string, data: any): Promise<ApiResponse> {
  if (MOCK_MODE) {
    return { ok: true, message: 'Demo mode - form submitted (not saved)' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/schools/${mobile}/submit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    if (!text) {
      return {
        ok: false,
        error: 'Empty response from server',
      };
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        ok: false,
        error: `Invalid JSON response: ${text.substring(0, 100)}`,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error - Backend server may not be running',
    };
  }
}

/**
 * Upload a document file. Returns mock success in demo mode.
 */
export async function uploadDocument(mobile: string, file: File): Promise<ApiResponse<{ filename: string; path: string }>> {
  if (MOCK_MODE) {
    return {
      ok: true,
      data: { filename: file.name, path: `demo/${file.name}` },
      message: 'Demo mode - file not actually uploaded',
    };
  }

  try {
    const formDataUpload = new FormData();
    formDataUpload.append('document', file);

    const response = await fetch(`${API_BASE_URL}/uploads/${mobile}/document`, {
      method: 'POST',
      body: formDataUpload,
    });

    const result = await response.json();
    if (result.ok) {
      return {
        ok: true,
        data: { filename: result.file.filename, path: result.file.path },
      };
    }
    return { ok: false, error: result.error || 'Upload failed' };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Upload failed. Please try again.',
    };
  }
}
