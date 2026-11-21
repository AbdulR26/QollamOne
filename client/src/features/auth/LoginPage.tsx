import { AuthUser } from './auth.types.ts';
import { useLogin } from './useLogin.ts';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    fieldErrors,
    serverError,
    submitting,
    handleSubmit,
  } = useLogin(onLoginSuccess);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-600/30">
            Q
          </div>
          <span className="text-xl font-semibold tracking-tight">QollamOne</span>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Multi-School Platform
          </span>
          <h1 className="text-3xl font-bold leading-tight">
            Kelola seluruh operasional sekolah dalam satu sistem terpadu.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Akses dashboard admin terpusat untuk manajemen akademik, kesiswaan, keuangan, dan laporan lintas sekolah secara aman.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} QollamOne. All rights reserved.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              Q
            </div>
            <span className="text-lg font-semibold text-slate-900">QollamOne</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Masuk ke Akun</h2>
              <p className="text-sm text-slate-500 mt-1">
                Silakan masukkan email dan password Anda untuk melanjutkan.
              </p>
            </div>

            {serverError && (
              <div
                role="alert"
                className="mb-5 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700"
              >
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                    fieldErrors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-rose-600">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pr-16 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${
                      fieldErrors.password
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    {showPassword ? 'Tutup' : 'Lihat'}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-xs text-rose-600">{fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 px-4 shadow-sm transition cursor-pointer"
              >
                {submitting ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
