import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import Catalog from './pages/Catalog';
import Login from './pages/Login';
import DeleteBook from './pages/DeleteBook';

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Router>
          <div className="app-container">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/delete" 
                  element={
                    <ProtectedRoute>
                      <DeleteBook />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </Router>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;
