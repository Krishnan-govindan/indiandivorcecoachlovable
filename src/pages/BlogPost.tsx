import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import ParticleBackground from '@/components/ParticleBackground';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

// Convert plain-text content (with line breaks and markdown-ish patterns)
// into structured HTML so pasted text still renders with proper headings,
// paragraphs, lists, and bold runs.
function autoFormatPlainText(raw: string): string {
  const trimmed = raw.trim();
  // If the content already contains real block tags, treat it as HTML.
  if (/<(p|h[1-6]|ul|ol|li|blockquote|pre|img|iframe|div)\b/i.test(trimmed)) {
    return trimmed;
  }

  const lines = trimmed.split(/\r?\n/);
  const blocks: string[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push(`<p>${paragraphBuffer.join(' ')}</p>`);
      paragraphBuffer = [];
    }
  };
  const flushList = () => {
    if (listBuffer.length && listType) {
      blocks.push(`<${listType}>${listBuffer.map((i) => `<li>${i}</li>`).join('')}</${listType}>`);
      listBuffer = [];
      listType = null;
    }
  };

  const inlineFormat = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/\*(?!\s)([^*]+?)\*/g, '<em>$1</em>');

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Markdown-style headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushParagraph();
      flushList();
      const level = h[1].length;
      blocks.push(`<h${level}>${inlineFormat(h[2])}</h${level}>`);
      continue;
    }

    // Numbered list "1. ", "2) "
    const ol = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (ol) {
      flushParagraph();
      if (listType !== 'ol') flushList();
      listType = 'ol';
      listBuffer.push(inlineFormat(ol[2]));
      continue;
    }

    // Bullet list "- " or "• " or "* "
    const ul = line.match(/^([-*•])\s+(.*)$/);
    if (ul) {
      flushParagraph();
      if (listType !== 'ul') flushList();
      listType = 'ul';
      listBuffer.push(inlineFormat(ul[2]));
      continue;
    }

    // Heuristic: short standalone line that looks like a heading
    // (e.g. "Introduction", "1. Allow Yourself to Grieve")
    const looksLikeHeading =
      line.length < 90 &&
      !line.endsWith('.') &&
      !line.endsWith(',') &&
      /^[A-Z0-9]/.test(line) &&
      line.split(' ').length <= 12;

    if (looksLikeHeading && paragraphBuffer.length === 0) {
      flushList();
      blocks.push(`<h2>${inlineFormat(line)}</h2>`);
      continue;
    }

    flushList();
    paragraphBuffer.push(inlineFormat(line));
  }

  flushParagraph();
  flushList();

  return blocks.join('\n');
}

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
      <div className="min-h-screen bg-gradient-hero text-foreground flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
        <ParticleBackground />
        <SiteHeader />
        <div className="relative z-10 flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold mb-4 text-gradient">
              Article not found
            </h1>
            <Link to="/blog" className="text-primary underline">
              Back to all articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedBody = autoFormatPlainText(blog.body || '');
  const cleanBody = DOMPurify.sanitize(formattedBody, {
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
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
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

      <SiteHeader />

      <article className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All articles
          </Link>

          <header className="mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">{blog.title}</span>
            </h1>
            {blog.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                {blog.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border/50 py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {blog.author || 'Krishnan Govindan'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {blog.reading_minutes || 5} min read
              </span>
            </div>
          </header>

          {blog.cover_image_url && (
            <div className="card-luxury p-2 mb-12 animate-glow">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full rounded-xl"
              />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: cleanBody }}
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/50">
              <h3 className="font-display font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 card-luxury p-8 text-center">
            <h3 className="font-display text-2xl font-semibold mb-3 text-gradient">
              Ready to start your healing journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a free discovery call with India's 1st Divorce Coach.
            </p>
            <a
              href="https://calendly.com/fulsuccess/ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero inline-flex items-center"
            >
              Schedule a Session
            </a>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
