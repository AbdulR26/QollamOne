export function AdminFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} <strong className="text-slate-700">QollamOne</strong> &mdash; Multi-School Management Platform
        </p>
        <p>v1.0.0 &bull; Express + React + TypeScript</p>
      </div>
    </footer>
  );
}
