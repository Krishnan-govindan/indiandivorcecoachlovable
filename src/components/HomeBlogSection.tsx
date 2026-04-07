import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export default function HomeBlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);
      setBlogs((data as Blog[]) || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (blogs.length === 0) return null;

  return (
    <section className="py-20 relative" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Insights & Articles
          </h2>
          <p className="text-lg text-purple-100/70 max-w-2xl mx-auto">
            Real, compassionate guidance on divorce recovery, breakup healing, and rebuilding
            your life from India's First Divorce Coach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {blogs.map((b) => (
            <article
              key={b.id}
              className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all hover:-translate-y-1"
            >
              <Link to={`/blog/${b.slug}`} className="block">
                {b.cover_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={b.cover_image_url}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-purple-300 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {b.published_at ? new Date(b.published_at).toLocaleDateString() : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {b.reading_minutes || 5} min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition line-clamp-2">
                    {b.title}
                  </h3>
                  {b.excerpt && (
                    <p className="text-sm text-purple-100/70 line-clamp-3">{b.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" variant="secondary" className="group">
              Show More Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
