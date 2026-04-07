import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 text-white">
      <SEO
        title="Blog — Divorce Recovery, Breakup Healing & Life Coaching Insights"
        description="Read expert articles on divorce recovery, breakup healing, relationship transitions, and life coaching from Krishnan Govindan, India's First Divorce Coach."
        keywords="divorce blog india, breakup recovery articles, divorce coach blog, healing after divorce, krishnan govindan blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: "India's First Divorce Coach Blog",
          description: 'Expert insights on divorce recovery, breakup healing, and life coaching.',
          author: { '@type': 'Person', name: 'Krishnan Govindan' },
        }}
      />
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-white mb-8 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <header className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Insights on Divorce Recovery & Healing
          </h1>
          <p className="text-lg text-purple-100/80">
            Real, compassionate guidance from India's First Divorce Coach. Read stories,
            frameworks, and practical advice that have helped hundreds rebuild their lives.
          </p>
        </header>

        {loading ? (
          <p className="text-purple-200">Loading articles…</p>
        ) : blogs.length === 0 ? (
          <p className="text-purple-200">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        {b.reading_minutes || 5} min read
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition">
                      {b.title}
                    </h2>
                    {b.excerpt && (
                      <p className="text-sm text-purple-100/70 line-clamp-3">{b.excerpt}</p>
                    )}
                    <Button variant="link" className="mt-4 px-0 text-purple-300">
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
