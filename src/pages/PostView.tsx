import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Zap, ExternalLink } from 'lucide-react';
import { MarkdownRenderer } from '../lib/markdown';
import { POSTS_JSON_URL } from '../config';
import type { Post } from '../types/Post';

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // En una app real esto sería fetch(`/api/posts/${id}`) o buscar en un estado global
    // Aquí cargaremos el JSON completo y buscaremos el post
    setLoading(true);
    fetch(POSTS_JSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Error de red');
        return res.json();
      })
      .then((data: Post[]) => {
        const found = data.find(p => p.id === id);
        if (found) {
          setPost(found);
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

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="inline-flex items-center text-foreground/60 hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Link>
      
      <header className="mb-10 text-center md:text-left">
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
          {post.categories.map((cat) => (
            <span key={cat} className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
              {cat}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-foreground">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-8 text-sm text-foreground/60 border-y border-border py-6 mb-10">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span className="font-medium">
              {new Date(post.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Zap className="w-4 h-4 mr-1.5 fill-amber-500" />
            Score: {post.score}
          </div>
          {post.source && (
            <div className="flex items-center bg-muted/50 px-3 py-1 rounded-full border border-border">
              <span className="text-foreground/40 mr-2 uppercase text-[10px] font-bold tracking-widest">Fuente</span>
              <span className="font-bold text-foreground/80">{post.source}</span>
            </div>
          )}
          {post.originalUrl && (
            <a 
              href={post.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary font-bold hover:text-primary/80 transition-colors group"
            >
              <span>Ver original</span>
              <ExternalLink className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </header>
      
      <div className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 relative aspect-[21/9] md:aspect-[21/7]">
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
      
      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}
