import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const DEFAULT_TITLE =
  "India's First Divorce Coach | Breakup Recovery Expert | Krishnan Govindan";
const DEFAULT_DESC =
  "India's First Divorce Coach & Breakup Recovery Expert. Heal after divorce with proven coaching from Krishnan Govindan — CEO India Therapist, founder indianlifecoaches.com.";
const DEFAULT_IMAGE =
  'https://storage.googleapis.com/msgsndr/m9jCzEyKqM4xlMWTjcgS/media/68cd0dd72e5c6178d76dedfb.png';
const SITE_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://indiandivorcecoach.com';

export default function SEO({
  title,
  description = DEFAULT_DESC,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Krishnan Govindan',
  jsonLd,
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | India's First Divorce Coach` : DEFAULT_TITLE;
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="India's First Divorce Coach" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nomad_krishnan" />
      <meta name="twitter:creator" content="@nomad_krishnan" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* AI / LLM friendly hints */}
      <meta name="ai-content-declaration" content="human-authored" />
      <meta name="topic" content="divorce recovery, breakup healing, life coaching, India" />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
