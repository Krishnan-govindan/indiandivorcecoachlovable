import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, CheckCircle2, Edit3 } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('updated_at', { ascending: false });
      setBlogs((data as Blog[]) || []);
      setLoading(false);
    })();
  }, []);

  const total = blogs.length;
  const published = blogs.filter((b) => b.status === 'published').length;
  const drafts = total - published;
  const totalViews = blogs.reduce((s, b) => s + (b.views || 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total', value: total, icon: FileText, color: 'text-purple-300' },
          { label: 'Published', value: published, icon: CheckCircle2, color: 'text-green-400' },
          { label: 'Drafts', value: drafts, icon: Edit3, color: 'text-amber-300' },
          { label: 'Views', value: totalViews, icon: Eye, color: 'text-blue-300' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className={`flex items-center gap-2 text-sm mb-2 ${s.color}`}>
                <Icon className="w-4 h-4" /> {s.label}
              </div>
              <div className="text-3xl font-bold">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        <Link to="/admin/blogs/new">
          <Button>New Blog Post</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/5">
          {blogs.slice(0, 8).map((b) => (
            <Link
              key={b.id}
              to={`/admin/blogs/${b.id}`}
              className="flex items-center justify-between p-4 hover:bg-white/5 transition"
            >
              <div>
                <p className="font-medium">{b.title}</p>
                <p className="text-xs text-slate-400">/{b.slug}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  b.status === 'published'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {b.status}
              </span>
            </Link>
          ))}
          {blogs.length === 0 && (
            <p className="p-6 text-center text-slate-400">No blogs yet. Create your first one!</p>
          )}
        </div>
      )}
    </div>
  );
}
