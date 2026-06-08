import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { StudentContext } from './context/StudentContext';
import './App.css';

function App() {
  // Lifting State Up: State is maintained in the parent component
  const [students, setStudents] = useState([]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      <div className="app-container">
        <header className="app-header">
          <h1>Student Management System</h1>
        </header>
        <main className="main-content">
          <StudentForm />
          <StudentList />
        </main>
      </div>
    </StudentContext.Provider>
  );
}

export default App;
