import { useState } from 'react';
import { AdminFooter } from './AdminFooter.tsx';
import { AdminHeader } from './AdminHeader.tsx';
import { AdminNavbar } from './AdminNavbar.tsx';
import { AdminLayoutProps } from './layout.types.ts';

export function AdminLayout({
  user,
  title,
  subtitle,
  navItems,
  activeKey,
  onNavigate,
  onLogout,
  children,
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminNavbar
        navItems={navItems}
        activeKey={activeKey}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          user={user}
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileOpen(true)}
          onLogout={onLogout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>

        <AdminFooter />
      </div>
    </div>
  );
}
