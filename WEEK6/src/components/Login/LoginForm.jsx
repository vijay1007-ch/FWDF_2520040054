import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './LoginForm.css';

const validateLogin = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

const LoginForm = ({ onToggleForm }) => {
  const [loginStatus, setLoginStatus] = useState(null);
  
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setIsSubmitting
  } = useForm({
    email: '',
    password: ''
  }, validateLogin);

  const onSubmit = async (formValues) => {
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // Simulate success/failure logic based on email
    // For demonstration purposes, emails starting with "error" will fail
    if (formValues.email.toLowerCase().startsWith('error')) {
       setLoginStatus({ success: false, message: 'Invalid credentials. Please check your email or password.' });
    } else {
       setLoginStatus({ success: true, message: `Login successful! Welcome back, ${formValues.email}.` });
    }
  };

  return (
    <div className="login-container glass-panel animate-fade-in">
      <div className="login-header">
        <h1>Welcome Back</h1>
        <p>Login to the University ERP System</p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="login-form" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="student@university.edu"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
        />
        
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
        />

        {loginStatus && !loginStatus.success && (
          <div className="login-error animate-slide-in">
            {loginStatus.message}
          </div>
        )}

        <div className="form-actions">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
            icon={LogIn}
          >
            Login
          </Button>
        </div>
        
        <div className="login-prompt">
          Don't have an account?{' '}
          <button type="button" onClick={onToggleForm} className="login-link">
            Register here
          </button>
        </div>
      </form>

      {/* Success State Output */}
      {loginStatus && loginStatus.success && (
        <div className="success-output animate-slide-in" style={{ marginTop: '20px', textAlign: 'center', fontWeight: '500', color: 'var(--success)' }}>
          {loginStatus.message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
