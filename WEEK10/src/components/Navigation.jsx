import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, LogOut, LogIn, Trash2 } from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <Book className="text-primary" /> Library System
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Catalog</Link>
        {user && (
          <Link to="/delete" className={`nav-link ${location.pathname === '/delete' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Trash2 size={16} /> Manage
          </Link>
        )}
        
        {user ? (
          <button onClick={logout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={16} /> Logout ({user.name})
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <LogIn size={16} /> Login
          </Link>
        )}
      </div>
    </nav>
  );
}
