import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './TeacherDashboard.css'; // Import the updated CSS

function TeacherDashboard() {
  const navigate = useNavigate();

  // Navigate to Questions Management page
  const goToQuestionsPage = () => {
    navigate('/teacher-dashboard/questions');
  };

  // Navigate to Quizzes Management page
  const goToQuizzesPage = () => {
    navigate('/teacher-dashboard/quizzes');
  };

  return (
    <div>
      <Navbar />
      <div className="teacher-dashboard">
        <h2>Teacher Dashboard</h2>

        <div className="dashboard-boxes">
          <div className="box" onClick={goToQuestionsPage}>
            <h3>Questions</h3>
            <p>Manage your questions: Add, Edit, Delete</p>
          </div>
          <div className="box" onClick={goToQuizzesPage}>
            <h3>Quizzes</h3>
            <p>Create and Manage your quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
