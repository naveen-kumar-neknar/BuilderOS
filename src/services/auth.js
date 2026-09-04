import { request, setAuthToken, getAuthToken } from './api';

export const authService = {
  async login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  async register(name, email, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  async getMe() {
    const token = getAuthToken();
    if (!token) return null;
    try {
      const data = await request('/auth/me');
      return data.user || null;
    } catch {
      setAuthToken(null);
      return null;
    }
  },

  async logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {}
    setAuthToken(null);
  },

  async forgotPassword(email) {
    return request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  async resetPassword(token, newPassword) {
    return request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }
};

export default authService;
