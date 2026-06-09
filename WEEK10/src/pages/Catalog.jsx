import { useLibrary } from '../context/LibraryContext';
import BookCard from '../components/BookCard';

export default function Catalog() {
  const { books, loading } = useLibrary();

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" style={{ width: '3rem', height: '3rem', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
        <p style={{ marginTop: '1rem' }}>Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Library Catalog</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse our collection of {books.length} books.</p>
      </div>

      {books.length === 0 ? (
        <div className="state-container">
          <p>No books available in the catalog.</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
