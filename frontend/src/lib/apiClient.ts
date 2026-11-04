const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  try {
    const token = localStorage.getItem('b4b_auth_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const resJson = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: resJson.message || 'Request failed',
        data: resJson.data,
      };
    }

    return {
      success: true,
      data: resJson.data,
      message: resJson.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Network error connecting to API',
    };
  }
}

