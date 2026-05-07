import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Zap, ExternalLink } from 'lucide-react';
import { MarkdownRenderer } from '../lib/markdown';
import { formatPostDate } from '../lib/utils';
import { POSTS_JSON_URL } from '../config';
import type { Post } from '../types/Post';
import Comments from '../components/Comments';

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // En una app real esto sería fetch(`/api/posts/${id}`) o buscar en un estado global
    // Aquí cargaremos el JSON completo y buscaremos el post
    setLoading(true);
    fetch(`${POSTS_JSON_URL}?t=${Date.now()}`)
      .then(res => {
        if (!res.ok) throw new Error('Error de red');
        return res.json();
      })
      .then((data: Post[]) => {
        const found = data.find(p => p.id === id);
        if (found) {
          setPost(found);
          const related = data
            .filter(p => p.title && p.title.trim() !== '' && p.content && p.content.trim() !== '') // also filter empty ones
            .filter(p => p.id !== id && p.categories.some(c => found.categories.includes(c)))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setError('Artículo no encontrado');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el artículo');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (post) {
      // Actualizar el título de la pestaña
      document.title = `${post.title} | Urano AI News`;
      
      // Actualizar el meta tag og:title (crucial para Giscus mapping="title")
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', post.title);

      // Limpieza al desmontar
      return () => {
        document.title = "Urano AI News";
      };
    }
  }, [post]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Artículo no encontrado'}</h2>
        <Link to="/" className="text-primary hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la página principal
        </Link>
      </div>
    );
  }

  const readingTime = Math.max(1, Math.round(post.content.split(/\s+/).filter(Boolean).length / 220));

  return (
    <article className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Link>

      <div className="grid gap-10 xl:grid-cols-[2.1fr,0.9fr] xl:items-start">
        <div className="space-y-10">
          <header className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center text-sm uppercase tracking-[0.3em] text-foreground/60 bg-background border border-border rounded-full px-3 py-2">
                  {readingTime} min lectura
                </div>
                <div className="flex items-center text-sm uppercase tracking-[0.3em] text-foreground/60 bg-background border border-border rounded-full px-3 py-2">
                  {formatPostDate(post)}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02] text-foreground">
              {post.title}
            </h1>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
              <div className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-foreground">Score {post.score}</span>
              </div>
              {post.source && (
                <div className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-2">
                  <span className="uppercase tracking-widest text-[10px] text-foreground/50">Fuente</span>
                  <span className="font-semibold text-foreground">{post.source}</span>
                </div>
              )}
              {post.originalUrl && (
                <a
                  href={post.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  <span>Leer original</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </header>

          <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 relative aspect-[21/9] md:aspect-[21/7]">
            <img
              src={post.image || post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600'}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600';
              }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>

          <div className="bg-card border-4 border-foreground brutalist-shadow p-6 md:p-10">
            <MarkdownRenderer content={post.content} />
          </div>

          <Comments title={post.title} />
        </div>

        <aside className="space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">Artículo</p>
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-2">Categorías</p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <span key={cat} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] uppercase tracking-[0.2em] font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-2">Resumen rápido</p>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex items-center gap-2"><span className="inline-flex h-2 w-2 rounded-full bg-primary" />Publicación: {formatPostDate(post)}</li>
                  <li className="flex items-center gap-2"><span className="inline-flex h-2 w-2 rounded-full bg-primary" />Lectura: {readingTime} min</li>
                  <li className="flex items-center gap-2"><span className="inline-flex h-2 w-2 rounded-full bg-primary" />Score: {post.score}</li>
                  {post.source && <li className="flex items-center gap-2"><span className="inline-flex h-2 w-2 rounded-full bg-primary" />Fuente: {post.source}</li>}
                </ul>
              </div>
              {post.originalUrl && (
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-2">Lectura externa</p>
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                  >
                    Abrir fuente original
                  </a>
                </div>
              )}
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Top stories</p>
                  <h3 className="text-xl font-bold">Más en esta sección</h3>
                </div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">{relatedPosts.length}</span>
              </div>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/post/${related.id}`}
                    className="block rounded-3xl border border-border bg-background p-4 transition-colors hover:border-foreground/40 hover:bg-foreground/5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">{related.categories[0]?.toUpperCase() || 'NOTICIA'}</p>
                    <p className="font-semibold text-foreground leading-tight">{related.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

