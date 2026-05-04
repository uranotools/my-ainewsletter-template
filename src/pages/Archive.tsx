import React from 'react';
import { Link } from 'react-router-dom';

export default function Archive() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Archivo Histórico</h1>
      <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
        Explora todas las noticias y avances de inteligencia artificial publicados a lo largo del tiempo.
      </p>
      <Link to="/" className="text-primary hover:underline">
        Volver a la página principal
      </Link>
      {/* Podrías reusar PostList y Filters aquí o hacer un layout más compacto de lista */}
    </div>
  );
}
