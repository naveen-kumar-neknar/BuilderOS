const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function getAuthToken() {
  try {
    return localStorage.getItem('hw_auth_token') || '';
  } catch {
    return '';
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem('hw_auth_token', token);
    } else {
      localStorage.removeItem('hw_auth_token');
    }
  } catch {}
}

export async function request(path, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let data;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => ({}));
  } else {
    const text = await response.text().catch(() => '');
    data = { text };
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export default {
  request,
  getAuthToken,
  setAuthToken
};
