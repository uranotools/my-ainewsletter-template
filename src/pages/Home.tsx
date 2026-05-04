import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FeaturedPost from '../components/FeaturedPost';
import PostList from '../components/PostList';
import Filters from '../components/Filters';
import EditorDashboard from '../components/EditorDashboard';
import { filterPosts, sortPosts, getAllCategories } from '../lib/utils';
import { POSTS_JSON_URL } from '../config';
import type { Post } from '../types/Post';

export default function Home() {
  const [searchParams] = useSearchParams();
  const isEditor = searchParams.get('role') === 'editor';
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(POSTS_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar las noticias. Verifica que public/data/posts.json existe.');
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => getAllCategories(posts), [posts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(posts, searchQuery, selectedCategories, null);
    return sortPosts(filtered, 'date', 'desc');
  }, [posts, searchQuery, selectedCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (isEditor) {
    return <EditorDashboard posts={posts} />;
  }

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {!searchQuery && selectedCategories.length === 0 && featuredPost && (
        <FeaturedPost post={featuredPost} onClick={() => navigate(`/post/${featuredPost.id}`)} />
      )}
      
      <Filters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {searchQuery || selectedCategories.length > 0 ? 'Resultados de búsqueda' : 'Últimas Noticias'}
          <span className="text-sm font-normal text-foreground/50 bg-muted px-2 py-1 rounded-full">
            {searchQuery || selectedCategories.length > 0 ? filteredPosts.length : regularPosts.length}
          </span>
        </h2>
        <PostList 
          posts={searchQuery || selectedCategories.length > 0 ? filteredPosts : regularPosts} 
          onPostClick={(post) => navigate(`/post/${post.id}`)}
        />
      </div>
    </div>
  );
}
