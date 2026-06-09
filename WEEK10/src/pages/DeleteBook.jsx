import { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import BookCard from '../components/BookCard';
import { Trash2 } from 'lucide-react';

export default function DeleteBook() {
  const { books, loading, deleteBook } = useLibrary();
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" style={{ width: '3rem', height: '3rem', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
        <p style={{ marginTop: '1rem' }}>Loading catalog for management...</p>
      </div>
    );
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    
    setDeletingId(id);
    setSuccessMessage('');
    
    try {
      await deleteBook(id);
      setSuccessMessage(`Successfully deleted "${title}"`);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      alert('Failed to delete book');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--danger)' }}>Manage Catalog</h1>
        <p style={{ color: 'var(--text-muted)' }}>Authorized personnel only. Deletions are permanent.</p>
      </div>

      {successMessage && (
        <div className="fade-in" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #22c55e' }}>
          {successMessage}
        </div>
      )}

      {books.length === 0 ? (
        <div className="state-container">
          <p>No books available in the catalog to delete.</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              actionButton={
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(book.id, book.title)}
                  disabled={deletingId === book.id}
                >
                  {deletingId === book.id ? (
                    <div className="spinner" style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}></div>
                  ) : (
                    <><Trash2 size={16} /> Delete</>
                  )}
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
