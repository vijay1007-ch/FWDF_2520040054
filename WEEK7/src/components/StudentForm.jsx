import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import './StudentForm.css';

const StudentForm = () => {
  const [name, setName] = useState('');
  const { students, setStudents } = useContext(StudentContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setStudents([...students, { id: Date.now(), name }]);
      setName('');
    }
  };

  return (
    <div className="student-form-container glass-panel">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter student name"
          className="student-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
};

export default StudentForm;
