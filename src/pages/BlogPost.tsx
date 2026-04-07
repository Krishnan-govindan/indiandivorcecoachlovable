import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import ParticleBackground from '@/components/ParticleBackground';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (error || !data) {
        setNotFound(true);
      } else {
        setBlog(data as Blog);
        // Increment view count (best-effort)
        supabase
          .from('blogs')
          .update({ views: ((data as Blog).views || 0) + 1 })
          .eq('id', (data as Blog).id)
          .then(() => undefined);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <Link to="/blog" className="text-purple-300 underline">
            Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const cleanBody = DOMPurify.sanitize(blog.body, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'],
  });

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.excerpt,
    image: blog.cover_image_url || undefined,
    datePublished: blog.published_at,
    dateModified: blog.updated_at,
    author: {
      '@type': 'Person',
      name: blog.author || 'Krishnan Govindan',
      url: 'https://www.indianlifecoaches.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: "India's First Divorce Coach",
      logo: {
        '@type': 'ImageObject',
        url: 'https://storage.googleapis.com/msgsndr/m9jCzEyKqM4xlMWTjcgS/media/68cd0dd72e5c6178d76dedfb.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : '',
    },
    keywords: blog.meta_keywords || (blog.tags || []).join(', '),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 text-white">
      <SEO
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.excerpt || blog.title}
        keywords={blog.meta_keywords || (blog.tags || []).join(', ')}
        image={blog.cover_image_url || undefined}
        type="article"
        publishedTime={blog.published_at || undefined}
        modifiedTime={blog.updated_at}
        author={blog.author || 'Krishnan Govindan'}
        jsonLd={articleJsonLd}
      />
      <ParticleBackground />

      <article className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <p className="text-xl text-purple-200/80 mb-6">{blog.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-purple-300">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {blog.author || 'Krishnan Govindan'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : ''}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {blog.reading_minutes || 5} min read
            </span>
          </div>
        </header>

        {blog.cover_image_url && (
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="w-full rounded-2xl mb-10"
          />
        )}

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:text-purple-100 prose-a:text-purple-300 prose-strong:text-white prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: cleanBody }}
        />

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
