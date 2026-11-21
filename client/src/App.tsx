import { useAuthSession } from './features/auth/useAuthSession.ts';
import { LoginPage } from './features/auth/LoginPage.tsx';
import { DashboardPage } from './features/dashboard/DashboardPage.tsx';

export function App() {
  const { user, setUser, checkingAuth, logout } = useAuthSession();

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

  return <DashboardPage user={user} onLogout={logout} />;
}

export default App;
