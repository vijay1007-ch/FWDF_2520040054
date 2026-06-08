import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(''); // 'success', 'error', 'loading', ''

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('');
    
    if (validate()) {
      setStatus('loading');
      // Simulate API call
      setTimeout(() => {
        // Simple mock authentication
        if (formData.email === 'student@university.edu' && formData.password === 'password123') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }, 1500);
    }
  };

  return (
    <div className="login-container glass-panel">
      <div className="login-header">
        <h2>University ERP</h2>
        <p>Sign in to your account</p>
      </div>

      {status === 'success' ? (
        <div className="success-message">
          <div className="icon-success">✓</div>
          <h3>Login Successful!</h3>
          <p>Welcome back to the University Portal.</p>
          <button className="btn-primary" onClick={() => {
            setStatus('');
            setFormData({ email: '', password: '' });
          }}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {status === 'error' && (
            <div className="alert-error">
              Invalid email or password. Hint: try student@university.edu / password123
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. student@university.edu"
              className={errors.email ? 'input-error' : ''}
              disabled={status === 'loading'}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''}
              disabled={status === 'loading'}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${status === 'loading' ? 'loading' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
