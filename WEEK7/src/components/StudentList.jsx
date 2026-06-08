import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import './StudentList.css';

const StudentList = () => {
  const { students } = useContext(StudentContext);

  return (
    <div className="student-list-container glass-panel">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p className="empty-message">No students added yet.</p>
      ) : (
        <ul className="student-list">
          {students.map((student) => (
            <li key={student.id} className="student-item">
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
