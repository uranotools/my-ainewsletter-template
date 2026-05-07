import { useEffect, useRef } from 'react';

interface CommentsProps {
  title: string;
}

export default function Comments({ title }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!title) return;

    const repo = import.meta.env.VITE_GISCUSS_REPO || '';
    const repoId = import.meta.env.VITE_GISCUSS_REPO_ID || '';
    const category = import.meta.env.VITE_GISCUSS_CATEGORY || '';
    const categoryId = import.meta.env.VITE_GISCUSS_CATID || '';

    // Validar que tenemos los datos mínimos requeridos
    if (!repo || !repoId || !category || !categoryId) {
      console.warn('Giscus: Faltan variables de entorno. Comentarios deshabilitados.');
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '<p class="text-foreground/60 text-sm">Los comentarios no están disponibles en este momento.</p>';
      }
      return;
    }

    // Limpiar el contenedor antes de inyectar
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    // Crear e inyectar el script de Giscus
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('data-allow-guest', '1');
    script.crossOrigin = "anonymous";
    script.async = true;

    // Mejor manejo de errores
    script.onerror = () => {
      console.error('Giscus: Error al cargar el script');
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '<p class="text-foreground/60 text-sm">Error al cargar los comentarios. Intenta recargar la página.</p>';
      }
    };

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
