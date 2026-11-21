import { ReactNode } from 'react';
import { AuthUser } from '../../features/auth/auth.types.ts';

export type AdminPageKey = 'dashboard' | 'schools' | 'users' | 'settings';

export interface NavItem {
  key: AdminPageKey;
  label: string;
  icon: ReactNode;
  badge?: string;
}

export interface AdminLayoutProps {
  user: AuthUser;
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  activeKey: AdminPageKey;
  onNavigate: (key: AdminPageKey) => void;
  onLogout: () => void;
  children: ReactNode;
}
