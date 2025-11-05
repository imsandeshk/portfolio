import { NavLink } from 'react-router-dom';
import { Bell, LineChart, MapPinned, Home, ClipboardList } from 'lucide-react';

export default function ScmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[280px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block border-r bg-muted/20">
        <div className="p-4 font-bold text-lg">SCM Portal</div>
        <nav className="px-2 space-y-1">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive ? 'bg-muted font-medium' : ''}`}>
            <Home size={16} /> Home
          </NavLink>
          <NavLink to="/scm/shipments" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive ? 'bg-muted font-medium' : ''}`}>
            <MapPinned size={16} /> Shipments
          </NavLink>
          <NavLink to="/scm/notifications" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive ? 'bg-muted font-medium' : ''}`}>
            <Bell size={16} /> Notifications
          </NavLink>
          <NavLink to="/scm/forms" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive ? 'bg-muted font-medium' : ''}`}>
            <ClipboardList size={16} /> Forms
          </NavLink>
          <NavLink to="/scm/reports" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted ${isActive ? 'bg-muted font-medium' : ''}`}>
            <LineChart size={16} /> Reports
          </NavLink>
        </nav>
      </aside>

      {/* Top nav (mobile) */}
      <div className="md:hidden sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="px-3 py-2 font-semibold">SCM Portal</div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-2">
          <NavLink to="/scm/shipments" className={({ isActive }) => `text-sm px-3 py-1.5 rounded-md border ${isActive ? 'bg-muted font-medium' : ''}`}>Shipments</NavLink>
          <NavLink to="/scm/notifications" className={({ isActive }) => `text-sm px-3 py-1.5 rounded-md border ${isActive ? 'bg-muted font-medium' : ''}`}>Notifications</NavLink>
          <NavLink to="/scm/forms" className={({ isActive }) => `text-sm px-3 py-1.5 rounded-md border ${isActive ? 'bg-muted font-medium' : ''}`}>Forms</NavLink>
          <NavLink to="/scm/reports" className={({ isActive }) => `text-sm px-3 py-1.5 rounded-md border ${isActive ? 'bg-muted font-medium' : ''}`}>Reports</NavLink>
        </nav>
      </div>

      <main className="p-4">{children}</main>
    </div>
  );
}
