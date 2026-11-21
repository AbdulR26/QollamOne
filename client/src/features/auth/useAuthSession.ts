import { useCallback, useEffect, useState } from 'react';
import { authService } from './auth.service.ts';
import { AuthUser } from './auth.types.ts';

export function useAuthSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let active = true;
    authService.getMe().then((currentUser) => {
      if (active) {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    setUser,
    checkingAuth,
    logout,
  };
}
