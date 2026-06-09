import React, { createContext, useState, useEffect } from 'react';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('libraryBooks');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', year: '1925' },
      { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0060935467', year: '1960' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now().toString() }]);
  };

  return (
    <LibraryContext.Provider value={{ books, addBook }}>
      {children}
    </LibraryContext.Provider>
  );
};
