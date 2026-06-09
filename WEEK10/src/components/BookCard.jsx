import { BookOpen } from 'lucide-react';

export default function BookCard({ book, actionButton }) {
  return (
    <div className="book-card fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
        <BookOpen size={24} />
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">By {book.author}</p>
      
      {actionButton && (
        <div className="book-actions">
          {actionButton}
        </div>
      )}
    </div>
  );
}
