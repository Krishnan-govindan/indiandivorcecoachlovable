import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Plus, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const nav = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/blogs', label: 'All Blogs', icon: FileText },
    { to: '/admin/blogs/new', label: 'New Blog', icon: Plus },
  ];

  async function logout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO title="Admin Panel" noindex />
      <div className="flex">
        <aside className="w-64 min-h-screen bg-slate-900/80 border-r border-white/10 p-6 flex flex-col">
          <h1 className="text-xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Coach Admin
          </h1>
          <nav className="space-y-1 flex-1">
            {nav.map((n) => {
              const active = n.exact
                ? location.pathname === n.to
                : location.pathname.startsWith(n.to);
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    active
                      ? 'bg-purple-500/20 text-purple-200'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-300"
            >
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
