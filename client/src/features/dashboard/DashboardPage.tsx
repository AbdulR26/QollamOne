import { AuthUser } from '../auth/auth.types.ts';
import { useDashboard } from './useDashboard.ts';

interface DashboardPageProps {
  user: AuthUser;
  onLogout: () => void;
}

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const { health } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              Q
            </div>
            <span className="font-semibold text-slate-900">QollamOne Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-lg font-semibold text-slate-900 mb-4">Profil Pengguna</h1>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">Nama</dt>
              <dd className="font-medium text-slate-900 mt-0.5">{user.name}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium text-slate-900 mt-0.5">{user.email}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-500 mb-1.5">Role</dt>
              <dd className="flex flex-wrap gap-2">
                {user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {health && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Status Sistem</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">API Status</dt>
                <dd className="font-semibold text-slate-900 mt-0.5 uppercase">{health.status}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Database (sibikaa)</dt>
                <dd
                  className={`font-semibold mt-0.5 ${
                    health.database === 'connected' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {health.database}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Uptime</dt>
                <dd className="font-medium text-slate-900 mt-0.5">{health.uptime.toFixed(1)}s</dd>
              </div>
            </dl>
          </div>
        )}
      </main>
    </div>
  );
}
