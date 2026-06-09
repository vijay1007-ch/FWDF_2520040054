import React, { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';
import { BookOpen } from 'lucide-react';

const BookList = () => {
  const { books } = useContext(LibraryContext);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 id="book-list-heading">Library Catalog</h1>
        <p>Browse the books currently available in the system.</p>
      </header>

      {books.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" aria-hidden="true" />
          <p>The catalog is currently empty.</p>
        </div>
      ) : (
        <div className="table-responsive" role="region" aria-labelledby="book-list-heading" tabIndex="0">
          <table className="books-table" aria-label="Books currently in catalog">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
