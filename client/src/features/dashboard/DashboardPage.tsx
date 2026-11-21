import { AuthUser } from '../auth/auth.types.ts';
import { useDashboard } from './useDashboard.ts';

interface DashboardPageProps {
  user: AuthUser;
}

export function DashboardPage({ user }: DashboardPageProps) {
  const { health } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Pengguna Aktif</p>
          <p className="text-lg font-bold text-slate-900 mt-1 truncate">{user.name}</p>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{user.email}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Status API</p>
          <p className="text-lg font-bold text-slate-900 mt-1 uppercase">
            {health ? health.status : '...'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {health ? `Uptime ${health.uptime.toFixed(1)}s` : 'Memeriksa...'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs font-medium text-slate-500">Database (sibikaa)</p>
          <p
            className={`text-lg font-bold mt-1 ${
              health?.database === 'connected'
                ? 'text-emerald-600'
                : health
                ? 'text-rose-600'
                : 'text-slate-400'
            }`}
          >
            {health ? health.database : '...'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">MySQL Connection Pool</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-3">Hak Akses (Roles)</h2>
        <div className="flex flex-wrap gap-2">
          {user.roles.length > 0 ? (
            user.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200"
              >
                {role}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">Tidak ada role terdaftar</span>
          )}
        </div>
      </div>
    </div>
  );
}
