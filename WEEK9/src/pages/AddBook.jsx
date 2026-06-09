import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LibraryContext } from '../context/LibraryContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AddBook = () => {
  const { addBook } = useContext(LibraryContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    year: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const titleInputRef = useRef(null);
  const errorSummaryRef = useRef(null);

  // Focus the first field on mount
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    else if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(formData.isbn)) {
      newErrors.isbn = 'Please enter a valid ISBN format';
    }
    if (!formData.year.trim()) newErrors.year = 'Publication year is required';
    else if (isNaN(formData.year) || parseInt(formData.year) < 1000 || parseInt(formData.year) > new Date().getFullYear()) {
      newErrors.year = 'Please enter a valid year';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Accessibility: Focus the error summary so screen readers read it out
      if (errorSummaryRef.current) {
        errorSummaryRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addBook(formData);
      setIsSubmitting(false);
      setSuccessMessage('Book added successfully!');
      setFormData({ title: '', author: '', isbn: '', year: '' });
      
      // Accessibility: Announce success, then navigate back after a moment
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 600);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Add New Book</h1>
        <p>Enter the details of the new book to add it to the library catalog.</p>
      </header>

      <div className="form-container">
        {hasErrors && (
          <div 
            className="error-summary" 
            role="alert" 
            tabIndex="-1" 
            ref={errorSummaryRef}
          >
            <AlertCircle className="alert-icon" aria-hidden="true" />
            <div>
              <p><strong>Please fix the following errors:</strong></p>
              <ul>
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="success-message" role="status">
            <CheckCircle className="success-icon" aria-hidden="true" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Book Title <span className="required" aria-hidden="true">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              ref={titleInputRef}
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span id="title-error" className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author <span className="required" aria-hidden="true">*</span></label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.author}
              aria-describedby={errors.author ? "author-error" : undefined}
              className={errors.author ? "input-error" : ""}
            />
            {errors.author && <span id="author-error" className="error-text">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN <span className="required" aria-hidden="true">*</span></label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.isbn}
              aria-describedby={errors.isbn ? "isbn-error" : "isbn-hint"}
              className={errors.isbn ? "input-error" : ""}
            />
            <span id="isbn-hint" className="hint-text">Format: 10 or 13 digits, with or without hyphens</span>
            {errors.isbn && <span id="isbn-error" className="error-text">{errors.isbn}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="year">Publication Year <span className="required" aria-hidden="true">*</span></label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.year}
              aria-describedby={errors.year ? "year-error" : undefined}
              className={errors.year ? "input-error" : ""}
            />
            {errors.year && <span id="year-error" className="error-text">{errors.year}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
