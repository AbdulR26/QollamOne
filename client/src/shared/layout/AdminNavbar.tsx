import { AdminPageKey, NavItem } from './layout.types.ts';

interface AdminNavbarProps {
  navItems: NavItem[];
  activeKey: AdminPageKey;
  onNavigate: (key: AdminPageKey) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminNavbar({
  navItems,
  activeKey,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: AdminNavbarProps) {
  const handleSelect = (key: AdminPageKey) => {
    onNavigate(key);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 select-none relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

      {/* Brand */}
      <div className="relative z-10 h-16 px-4 flex items-center justify-between border-b border-white/[0.08]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
            Q
          </div>
          {!collapsed && (
            <div className="truncate">
              <span className="font-bold text-white tracking-tight block leading-none">
                QollamOne
              </span>
              <span className="text-[11px] text-indigo-300/80 font-medium">
                Multi-School OS
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Perluas sidebar' : 'Perkecil sidebar'}
          className="hidden lg:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Tutup menu"
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Multi-School Tenant Switcher Pill */}
      {!collapsed && (
        <div className="relative z-10 px-3 pt-4">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-2.5 flex items-center justify-between gap-2 hover:bg-white/[0.07] transition cursor-pointer">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                YS
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Semua Sekolah</p>
                <p className="text-[10px] text-slate-400 truncate">Mode Yayasan Pusat</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="relative z-10 flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Navigasi Utama
          </p>
        )}
        {navItems.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSelect(item.key)}
              title={collapsed ? item.label : undefined}
              className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/90 to-violet-600/80 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-white/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              } ${collapsed ? 'justify-center' : 'justify-between'}`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className={`shrink-0 transition ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-300'}`}>
                  {item.icon}
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </span>
              {!collapsed && item.badge && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom System Card */}
      {!collapsed && (
        <div className="relative z-10 p-3 border-t border-white/[0.08]">
          <div className="rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-300">Database Core</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-xs font-semibold text-white mt-1">sibikaa (MySQL)</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="sticky top-0 h-screen">{navContent}</div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-64 max-w-[80vw] h-full z-10 shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
