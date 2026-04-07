import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import ParticleBackground from '@/components/ParticleBackground';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Card, CardContent } from '@/components/ui/card';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      setBlogs((data as Blog[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <SEO
        title="Blog — Divorce Recovery, Breakup Healing & Life Coaching Insights"
        description="Read expert articles on divorce recovery, breakup healing, relationship transitions, and life coaching from Krishnan Govindan, India's First Divorce Coach."
        keywords="divorce blog india, breakup recovery articles, divorce coach blog, healing after divorce, krishnan govindan blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: "India's First Divorce Coach Blog",
          description:
            'Expert insights on divorce recovery, breakup healing, and life coaching.',
          author: { '@type': 'Person', name: 'Krishnan Govindan' },
        }}
      />
      <ParticleBackground />

      <SiteHeader />

      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="text-primary font-medium">Insights & Articles</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stories of <span className="text-gradient">Healing & Rebuilding</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real, compassionate guidance from India's First Divorce Coach. Read stories,
              frameworks, and practical advice that have helped hundreds rebuild their lives.
            </p>
          </header>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading articles…</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No blog posts yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          {b.reading_minutes || 5} min read
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                        {b.title}
                      </h2>
                      {b.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {b.excerpt}
                        </p>
                      )}
                      <div className="mt-4 inline-flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Read more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
