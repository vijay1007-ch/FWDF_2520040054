import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import { LibraryProvider } from './context/LibraryContext';

function App() {
  return (
    <LibraryProvider>
      <div className="app-container">
        <Navigation />
        <main className="main-content" id="main-content">
          {/* Skip link for keyboard users (accessibility) */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
          </Routes>
        </main>
      </div>
    </LibraryProvider>
  );
}

export default App;
