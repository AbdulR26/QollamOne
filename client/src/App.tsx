import { useAuthSession } from './features/auth/useAuthSession.ts';
import { LoginPage } from './features/auth/LoginPage.tsx';
import { DashboardPage } from './features/dashboard/DashboardPage.tsx';
import { AdminLayout } from './shared/layout/AdminLayout.tsx';
import { AdminPageKey } from './shared/layout/layout.types.ts';
import { useAdminNavigation } from './shared/layout/useAdminNavigation.tsx';

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
  );
}

export function App() {
  const { user, setUser, checkingAuth, logout } = useAuthSession();
  const { activePage, setActivePage, navItems, pageMeta } = useAdminNavigation('dashboard');

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Memeriksa sesi...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />;
  }

  const renderContent = (page: AdminPageKey) => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage user={user} />;
      case 'schools':
        return (
          <PlaceholderSection
            title="Modul Data Sekolah"
            description="Siap diisi fitur manajemen daftar sekolah & tenant."
          />
        );
      case 'users':
        return (
          <PlaceholderSection
            title="Modul Pengguna & Role"
            description="Siap diisi fitur manajemen akun dan hak akses."
          />
        );
      case 'settings':
        return (
          <PlaceholderSection
            title="Modul Pengaturan"
            description="Siap diisi konfigurasi aplikasi dan tema sekolah."
          />
        );
    }
  };

  return (
    <AdminLayout
      user={user}
      title={pageMeta.title}
      subtitle={pageMeta.subtitle}
      navItems={navItems}
      activeKey={activePage}
      onNavigate={setActivePage}
      onLogout={logout}
    >
      {renderContent(activePage)}
    </AdminLayout>
  );
}

export default App;
