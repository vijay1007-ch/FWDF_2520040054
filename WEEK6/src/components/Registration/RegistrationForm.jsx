import { useState } from 'react';
import { User, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './RegistrationForm.css';

const validateRegistration = (values) => {
  const errors = {};
  
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  
  if (!values.course.trim()) {
    errors.course = 'Course is required';
  }

  return errors;
};

const RegistrationForm = ({ onToggleForm }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setIsSubmitting
  } = useForm({
    name: '',
    email: '',
    course: ''
  }, validateRegistration);

  const onSubmit = async (formValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Registration successful:', formValues);
    setIsSubmitting(false);
    setSubmittedData(formValues);
    setIsSuccess(true);
  };

  return (
    <div className="registration-container glass-panel animate-fade-in">
      <div className="registration-header">
        <h1>Student Registration System</h1>
        <p>Register below to enroll in your desired course.</p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="registration-form" noValidate>
        <Input
          label="Name"
          name="name"
          placeholder="Ramya"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          icon={User}
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="ramya@gmail.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
        />
        
        <Input
          label="Course"
          name="course"
          type="text"
          placeholder="CSE"
          value={values.course}
          onChange={handleChange}
          error={errors.course}
          icon={BookOpen}
        />

        <div className="form-actions">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
            icon={ArrowRight}
          >
            Register
          </Button>
        </div>

        <div className="login-prompt">
          Already have an account?{' '}
          <button type="button" onClick={onToggleForm} className="login-link">
            Login here
          </button>
        </div>
      </form>

      {/* The output data shown below the form */}
      {isSuccess && submittedData && (
        <div className="success-output animate-slide-in" style={{ marginTop: '20px', textAlign: 'center', fontWeight: '500', color: 'var(--success)' }}>
          Registration Successful! Name: {submittedData.name}, Email: {submittedData.email}, Course: {submittedData.course}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
