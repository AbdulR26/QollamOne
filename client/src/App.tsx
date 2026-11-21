import { useAuthSession } from './features/auth/useAuthSession.ts';
import { LoginPage } from './features/auth/LoginPage.tsx';
import { DashboardPage } from './features/dashboard/DashboardPage.tsx';
import { AdminLayout } from './shared/layout/AdminLayout.tsx';
import { AdminPageKey } from './shared/layout/layout.types.ts';
import { useAdminNavigation } from './shared/layout/useAdminNavigation.tsx';

function ModuleEmptyState({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-10 text-center max-w-2xl mx-auto my-8 shadow-2xs">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
        {badge}
      </span>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function App() {
  const { user, setUser, checkingAuth, logout } = useAuthSession();
  const { activePage, setActivePage, navItems, pageMeta } = useAdminNavigation('dashboard');

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <span>Memeriksa sesi...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />;
  }

  const renderContent = (page: AdminPageKey) => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage user={user} onNavigate={setActivePage} />;
      case 'schools':
        return (
          <ModuleEmptyState
            badge="Multi-School"
            title="Modul Data Sekolah"
            description="Halaman ini siap diisi CRUD daftar sekolah, jenjang, dan konfigurasi tema per sekolah."
          />
        );
      case 'users':
        return (
          <ModuleEmptyState
            badge="RBAC"
            title="Modul Pengguna & Role"
            description="Halaman ini siap diisi manajemen akun pengguna dan pemetaan role dari database sibikaa."
          />
        );
      case 'settings':
        return (
          <ModuleEmptyState
            badge="Konfigurasi"
            title="Modul Pengaturan Sistem"
            description="Halaman ini siap diisi pengaturan aplikasi, tahun akademik aktif, dan keamanan."
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
