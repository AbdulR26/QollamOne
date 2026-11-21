import { apiRequest } from '../../shared/api/httpClient.ts';
import { AuthUser, LoginPayload } from './auth.types.ts';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthUser> {
    const data = await apiRequest<{ user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data.user;
  },

  async getMe(): Promise<AuthUser | null> {
    try {
      const data = await apiRequest<{ user: AuthUser }>('/api/auth/me');
      return data.user;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  },
};
