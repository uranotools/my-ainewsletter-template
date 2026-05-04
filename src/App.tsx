import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import PostView from './pages/PostView';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/post/:id" element={<PostView />} />
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
