import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

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
    <section
      className="relative z-10 px-6 py-20 bg-gradient-section-alt border-y border-border/50"
      id="blog"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
            Insights & <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real, compassionate guidance on divorce recovery, breakup healing, and rebuilding
            your life from India's First Divorce Coach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogs.map((b) => (
            <Card
              key={b.id}
              className="card-luxury group hover:scale-105 transition-all duration-500 overflow-hidden"
            >
              <Link to={`/blog/${b.slug}`} className="block">
                {b.cover_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={b.cover_image_url}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      {b.published_at
                        ? new Date(b.published_at).toLocaleDateString()
                        : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      {b.reading_minutes || 5} min
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                    {b.title}
                  </h3>
                  {b.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog" className="btn-hero inline-flex items-center">
            Show More Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
