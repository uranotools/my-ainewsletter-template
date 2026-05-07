import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PostView from './pages/PostView';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    // 1. Guardar la ruta actual en localStorage para recuperarla después del login de Giscus
    const handleHashChange = () => {
      if (window.location.hash && !window.location.hash.includes('giscus')) {
        localStorage.setItem('giscus_last_route', window.location.hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // 2. Si regresamos de Giscus (?giscus=...) y no hay hash en la URL, 
    // intentamos restaurar la ruta guardada.
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('giscus') && !window.location.hash) {
      const savedHash = localStorage.getItem('giscus_last_route');
      if (savedHash) {
        window.location.hash = savedHash;
      }
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="py-6 border-t border-border mt-12 text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Urano AI News. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
