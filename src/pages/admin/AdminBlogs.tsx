import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink, Plus } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('updated_at', { ascending: false });
    setBlogs((data as Blog[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(b: Blog) {
    if (!confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('blogs').delete().eq('id', b.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Blog deleted');
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link to="/admin/blogs/new">
          <Button>
            <Plus className="w-4 h-4 mr-1" /> New Blog
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-300">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Updated</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-white/5">
                  <td className="p-4">
                    <p className="font-medium">{b.title}</p>
                    <p className="text-xs text-slate-400">/{b.slug}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        b.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(b.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      {b.status === 'published' && (
                        <Link to={`/blog/${b.slug}`} target="_blank">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      <Link to={`/admin/blogs/${b.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(b)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No blogs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
