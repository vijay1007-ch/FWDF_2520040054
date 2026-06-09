import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, PlusCircle, Library } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="main-navigation" aria-label="Main Navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Library className="nav-icon" aria-hidden="true" />
          <span className="brand-text">Alexandria</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              <Book className="nav-item-icon" aria-hidden="true" />
              <span>Book List</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add" 
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              <PlusCircle className="nav-item-icon" aria-hidden="true" />
              <span>Add Book</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
