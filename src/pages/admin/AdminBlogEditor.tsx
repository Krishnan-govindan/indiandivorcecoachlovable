import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import slugify from 'slugify';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import { supabase, type Blog } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const empty: Partial<Blog> = {
  slug: '',
  title: '',
  subtitle: '',
  excerpt: '',
  body: '',
  cover_image_url: '',
  author: 'Krishnan Govindan',
  tags: [],
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  status: 'draft',
  reading_minutes: 5,
};

export default function AdminBlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [blog, setBlog] = useState<Partial<Blog>>(empty);
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error || !data) {
        toast.error('Blog not found');
        navigate('/admin/blogs');
        return;
      }
      setBlog(data as Blog);
      setTagsInput(((data as Blog).tags || []).join(', '));
      setLoading(false);
    })();
  }, [id, isNew, navigate]);

  function update<K extends keyof Blog>(key: K, value: Blog[K]) {
    setBlog((b) => ({ ...b, [key]: value }));
  }

  function autoSlug() {
    if (!blog.title) return;
    update('slug', slugify(blog.title, { lower: true, strict: true }));
  }

  async function uploadFile(file: File): Promise<string | null> {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from('blog-media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      toast.error(error.message);
      return null;
    }
    const { data } = supabase.storage.from('blog-media').getPublicUrl(path);
    return data.publicUrl;
  }

  // Quill custom image handler -> Supabase storage
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const url = await uploadFile(file);
              if (!url) return;
              const editor = quillRef.current?.getEditor();
              const range = editor?.getSelection(true);
              editor?.insertEmbed(range?.index || 0, 'image', url);
            };
            input.click();
          },
        },
      },
    }),
    []
  );

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      update('cover_image_url', url);
      toast.success('Cover image uploaded');
    }
  }

  async function save(publish?: boolean) {
    if (!blog.title || !blog.slug || !blog.body) {
      toast.error('Title, slug and body are required');
      return;
    }
    setSaving(true);
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const status = publish ? 'published' : blog.status || 'draft';

    const payload: Partial<Blog> = {
      ...blog,
      tags,
      status,
      published_at:
        status === 'published' && !blog.published_at
          ? new Date().toISOString()
          : blog.published_at,
    };

    let result;
    if (isNew) {
      result = await supabase.from('blogs').insert(payload).select().single();
    } else {
      result = await supabase.from('blogs').update(payload).eq('id', id).select().single();
    }

    setSaving(false);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    toast.success(publish ? 'Published!' : 'Saved');
    if (isNew && result.data) {
      navigate(`/admin/blogs/${(result.data as Blog).id}`, { replace: true });
    } else {
      setBlog(result.data as Blog);
    }
  }

  async function deleteBlog() {
    if (!id || isNew) return;
    if (!confirm('Delete this blog permanently?')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Deleted');
    navigate('/admin/blogs');
  }

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/blogs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
        </div>
        <div className="flex gap-2">
          {!isNew && blog.status === 'published' && blog.slug && (
            <Link to={`/blog/${blog.slug}`} target="_blank">
              <Button variant="ghost">
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>
            </Link>
          )}
          {!isNew && (
            <Button variant="ghost" onClick={deleteBlog} className="text-red-400">
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          )}
          <Button variant="secondary" onClick={() => save(false)} disabled={saving}>
            <Save className="w-4 h-4 mr-1" /> Save Draft
          </Button>
          <Button onClick={() => save(true)} disabled={saving}>
            {saving ? 'Saving…' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <Label>Title *</Label>
            <Input
              value={blog.title || ''}
              onChange={(e) => update('title', e.target.value)}
              onBlur={() => !blog.slug && autoSlug()}
              className="bg-white/5 border-white/10 text-lg"
              placeholder="Your blog title"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              value={blog.subtitle || ''}
              onChange={(e) => update('subtitle', e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div>
            <Label>URL Slug *</Label>
            <div className="flex gap-2">
              <Input
                value={blog.slug || ''}
                onChange={(e) => update('slug', e.target.value)}
                className="bg-white/5 border-white/10 font-mono text-sm"
                placeholder="my-blog-post"
              />
              <Button type="button" variant="secondary" onClick={autoSlug}>
                Auto
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Public URL: /blog/{blog.slug || '...'}
            </p>
          </div>

          <div>
            <Label>Excerpt (short summary)</Label>
            <Textarea
              value={blog.excerpt || ''}
              onChange={(e) => update('excerpt', e.target.value)}
              rows={3}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div>
            <Label>Body *</Label>
            <div className="bg-white rounded-lg quill-wrap">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={blog.body || ''}
                onChange={(v) => update('body', v)}
                modules={quillModules}
                style={{ minHeight: 400 }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Use the toolbar to add images, videos, links, headings, lists, and formatting.
              Images are uploaded to Supabase Storage automatically.
            </p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Label className="block mb-2">Cover Image</Label>
            {blog.cover_image_url && (
              <img
                src={blog.cover_image_url}
                alt="cover"
                className="w-full rounded-lg mb-3"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="bg-white/5 border-white/10"
            />
            <Input
              type="text"
              placeholder="Or paste an image URL"
              value={blog.cover_image_url || ''}
              onChange={(e) => update('cover_image_url', e.target.value)}
              className="bg-white/5 border-white/10 mt-2 text-xs"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <Label>Tags (comma separated)</Label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="divorce, healing, recovery"
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <Label>Reading Time (minutes)</Label>
            <Input
              type="number"
              value={blog.reading_minutes || 5}
              onChange={(e) => update('reading_minutes', parseInt(e.target.value) || 5)}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">SEO Settings</h3>
            <div>
              <Label className="text-xs">Meta Title</Label>
              <Input
                value={blog.meta_title || ''}
                onChange={(e) => update('meta_title', e.target.value)}
                placeholder="60 characters max"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div>
              <Label className="text-xs">Meta Description</Label>
              <Textarea
                value={blog.meta_description || ''}
                onChange={(e) => update('meta_description', e.target.value)}
                rows={3}
                placeholder="155 characters max"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div>
              <Label className="text-xs">Meta Keywords</Label>
              <Input
                value={blog.meta_keywords || ''}
                onChange={(e) => update('meta_keywords', e.target.value)}
                placeholder="comma, separated"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Label>Status</Label>
            <p className="text-sm mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  blog.status === 'published'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {blog.status}
              </span>
            </p>
          </div>
        </aside>
      </div>

      <style>{`
        .quill-wrap .ql-container { min-height: 380px; font-size: 16px; }
        .quill-wrap .ql-editor { min-height: 380px; color: #1a1a1a; }
        .quill-wrap .ql-toolbar { background: #f8fafc; border-radius: 8px 8px 0 0; }
      `}</style>
    </div>
  );
}
