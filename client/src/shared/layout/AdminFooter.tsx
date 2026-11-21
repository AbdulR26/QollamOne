export function AdminFooter() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} <strong className="text-slate-700">QollamOne</strong> &mdash; Multi-School Education Platform
        </p>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            System Operational
          </span>
          <span className="text-slate-300">&bull;</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
