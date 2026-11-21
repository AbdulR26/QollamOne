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
      {/* Left Showcase Panel */}
      <div className="hidden lg:flex lg:w-[52%] bg-slate-950 text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
        {/* Subtle Background Grid & Glows */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-indigo-600/30 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
              Q
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">
                QollamOne
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Education Management System
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-indigo-300 border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Multi-School Ready
          </span>
        </div>

        {/* Hero & Feature Highlights */}
        <div className="relative z-10 max-w-lg space-y-8 my-auto py-8">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-[2.65rem] font-bold leading-[1.15] tracking-tight">
              Satu Kendali Terpadu untuk{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-300">
                Seluruh Sekolah.
              </span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Kelola data akademik, kesiswaan, kepegawaian, dan keuangan lintas unit sekolah dengan arsitektur modern yang cepat dan aman.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            <div className="flex items-start gap-3.5 rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Arsitektur Multi-Sekolah</h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Pemisahan hak akses dan data per unit sekolah dalam satu portal terpusat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Keamanan Sesi Terenkripsi</h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Autentikasi HttpOnly Cookie, Role-Based Access Control, dan proteksi brute-force.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-6">
          <span>&copy; {new Date().getFullYear()} QollamOne Platform</span>
          <span>v1.0 &bull; Secure Portal</span>
        </div>
      </div>

      {/* Right Login Area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-100/70 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-slate-200/70 blur-3xl pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/25">
              Q
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block leading-none">
                QollamOne
              </span>
              <span className="text-xs text-slate-500">Multi-School Platform</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/60 p-7 sm:p-9">
            <div className="mb-7">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
                Portal Admin
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Selamat Datang Kembali
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Masuk menggunakan akun terdaftar untuk mengakses dashboard.
              </p>
            </div>

            {serverError && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700"
              >
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@sekolah.sch.id"
                    className={`w-full rounded-xl border bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition ${
                      fieldErrors.email
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                        : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/15'
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs font-medium text-rose-600">
                    {fieldErrors.email}
                  </p>
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
                  <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className={`w-full rounded-xl border bg-slate-50/50 pl-10 pr-11 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition ${
                      fieldErrors.password
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15'
                        : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/15'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs font-medium text-rose-600">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 px-4 shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                {submitting && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                <span>{submitting ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
              </button>
            </form>

            <p className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              Butuh bantuan akses? Hubungi Administrator Yayasan atau Sekolah Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
