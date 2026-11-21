import { AuthUser } from '../auth/auth.types.ts';
import { AdminPageKey } from '../../shared/layout/layout.types.ts';
import { useDashboard } from './useDashboard.ts';

interface DashboardPageProps {
  user: AuthUser;
  onNavigate?: (key: AdminPageKey) => void;
}

export function DashboardPage({ user, onNavigate }: DashboardPageProps) {
  const { health } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg shadow-indigo-950/10">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />
        <div className="absolute right-24 -bottom-20 w-56 h-56 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-indigo-200 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portal Yayasan &amp; Multi-Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Selamat datang, {user.name}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Seluruh layanan backend Express, autentikasi sesi aman, dan koneksi database{' '}
              <span className="text-white font-semibold">sibikaa</span> berjalan normal.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm capitalize"
              >
                Role: {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Akun Login</span>
            <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          </div>
          <p className="text-lg font-bold text-slate-900 mt-3 truncate">{user.name}</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{user.email}</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Status API</span>
            <span className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
          </div>
          <p className="text-lg font-bold text-slate-900 mt-3 uppercase">
            {health ? health.status : 'CHECKING'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {health ? `Uptime ${health.uptime.toFixed(1)} detik` : 'Memeriksa server...'}
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Database Core</span>
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                health?.database === 'connected'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </span>
          </div>
          <p
            className={`text-lg font-bold mt-3 capitalize ${
              health?.database === 'connected'
                ? 'text-emerald-600'
                : health
                ? 'text-rose-600'
                : 'text-slate-400'
            }`}
          >
            {health ? health.database : '...'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">sibikaa (MySQL Pool)</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Arsitektur</span>
            <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </span>
          </div>
          <p className="text-lg font-bold text-slate-900 mt-3">Modular</p>
          <p className="text-xs text-slate-500 mt-0.5">Monolith + Layered</p>
        </div>
      </section>

      {/* Bottom 2-Column Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security & Roles */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Keamanan &amp; Hak Akses</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terproteksi
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Metode Sesi</span>
              <span className="font-medium text-slate-800">HttpOnly JWT Cookie</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Proteksi Login</span>
              <span className="font-medium text-slate-800">Bcrypt + Rate Limiter</span>
            </div>
            <div className="pt-1">
              <span className="text-slate-500 block mb-2">Role Terdaftar</span>
              <div className="flex flex-wrap gap-2">
                {user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 capitalize"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">Tidak ada role</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Akses Cepat Modul</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.('schools')}
              className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition group cursor-pointer"
            >
              <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                Data Sekolah &rarr;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Kelola unit sekolah &amp; konfigurasi tenant
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('users')}
              className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition group cursor-pointer"
            >
              <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                Pengguna &amp; Role &rarr;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Atur akun admin, guru, &amp; operator
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('settings')}
              className="sm:col-span-2 text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition group cursor-pointer"
            >
              <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                Pengaturan Sistem &rarr;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Sesuaikan preferensi aplikasi dan branding per sekolah
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
