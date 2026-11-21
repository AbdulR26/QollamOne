import { useState } from 'react';
import { AdminPageKey, NavItem } from './layout.types.ts';

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: 'schools',
    label: 'Data Sekolah',
    badge: 'Multi',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    key: 'users',
    label: 'Pengguna & Role',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6H2v-2a4 4 0 014-4h7a4 4 0 014 4v2zm-6-9a4 4 0 110-8 4 4 0 010 8zm6 0a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: 'Pengaturan',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export const PAGE_META: Record<AdminPageKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Ringkasan sistem & status koneksi platform QollamOne',
  },
  schools: {
    title: 'Data Sekolah',
    subtitle: 'Kelola unit sekolah terdaftar dalam arsitektur multi-sekolah',
  },
  users: {
    title: 'Pengguna & Role',
    subtitle: 'Manajemen akun dan hak akses berbasis role (RBAC)',
  },
  settings: {
    title: 'Pengaturan',
    subtitle: 'Konfigurasi sistem dan preferensi platform',
  },
};

export function useAdminNavigation(initialPage: AdminPageKey = 'dashboard') {
  const [activePage, setActivePage] = useState<AdminPageKey>(initialPage);

  return {
    activePage,
    setActivePage,
    navItems: ADMIN_NAV_ITEMS,
    pageMeta: PAGE_META[activePage],
  };
}
