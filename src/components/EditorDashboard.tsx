import React, { useState, useEffect } from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { GITHUB_POSTS_EDIT_URL } from '../config';
import type { Post } from '../types/Post';

interface EditorDashboardProps {
  posts: Post[];
}

export default function EditorDashboard({ posts }: EditorDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('editor_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('editor_auth', 'true');
      setError('');
    } else {
      setError('PIN incorrecto');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('editor_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-card border border-border rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Modo Editor</h2>
          <p className="text-foreground/60 text-center mt-2">Ingresa el PIN para acceder al dashboard de edición.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="PIN de acceso"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold rounded-xl py-3 hover:bg-primary/90 transition-colors"
          >
            Acceder
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Dashboard de Edición</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 font-semibold text-sm">ID / Título</th>
                <th className="p-4 font-semibold text-sm">Fecha</th>
                <th className="p-4 font-semibold text-sm">Score</th>
                <th className="p-4 font-semibold text-sm text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{post.title}</div>
                    <div className="text-xs text-foreground/50">{post.id}</div>
                  </td>
                  <td className="p-4 text-sm">{post.date}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500">
                      {post.score}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={GITHUB_POSTS_EDIT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Editar en GitHub
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
