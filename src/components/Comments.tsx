import { useEffect, useRef } from 'react';

interface CommentsProps {
  title: string;
}

export default function Comments({ title }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!title) return;

    // 1. Limpiar el contenedor antes de inyectar (importante en React/Vite HMR)
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    // 3. Crear e inyectar el script de Giscus
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', import.meta.env.VITE_GISCUSS_REPO || '');
    script.setAttribute('data-repo-id', import.meta.env.VITE_GISCUSS_REPO_ID || '');
    script.setAttribute('data-category', import.meta.env.VITE_GISCUSS_CATEGORY || '');
    script.setAttribute('data-category-id', import.meta.env.VITE_GISCUSS_CATID || '');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = "anonymous";
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    // Al desmontar el componente, eliminamos el script y el iframe
    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [title]);

  return (
    <section className="mt-20 pt-12 border-t-8 border-foreground">
      <div className="mb-10">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-foreground bg-primary inline-block px-4 py-2 brutalist-shadow">
          Comentarios
        </h2>
        <p className="mt-4 text-foreground/60 font-mono text-sm uppercase tracking-widest">
          Inicia sesión con GitHub para participar en la discusión.
        </p>
      </div>

      {/* Contenedor de Giscus */}
      <div
        ref={commentsRef}
        id="comments-container"
        className="giscus w-full bg-card brutalist-border p-4 md:p-8 min-h-[300px]"
      />
    </section>
  );
}
