import { createContext, useState, useEffect, useContext } from 'react';

const LibraryContext = createContext();

const MOCK_BOOKS = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  { id: 6, title: 'Moby-Dick', author: 'Herman Melville' },
];

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching initial catalog
  useEffect(() => {
    setTimeout(() => {
      setBooks(MOCK_BOOKS);
      setLoading(false);
    }, 800);
  }, []);

  const deleteBook = async (bookId) => {
    // Simulate an async backend API call for deletion
    return new Promise((resolve) => {
      setTimeout(() => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        resolve();
      }, 1000); // 1 second delay to simulate network latency
    });
  };

  return (
    <LibraryContext.Provider value={{ books, loading, deleteBook }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => useContext(LibraryContext);
