import { AuthUser } from '../../features/auth/auth.types.ts';

interface AdminHeaderProps {
  user: AuthUser;
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  onLogout: () => void;
}

export function AdminHeader({
  user,
  title,
  subtitle,
  onOpenMobileMenu,
  onLogout,
}: AdminHeaderProps) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Buka menu"
            className="lg:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: User Info + Logout */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center border border-indigo-200">
              {initials || 'U'}
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-sm font-semibold text-slate-800">{user.name}</p>
              <p className="text-[11px] text-slate-500">
                {user.roles[0] ?? 'user'}
              </p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
