// src/pages/HomePage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';

const quizzes = [
  { id: 1, title: "General Knowledge Quiz" },
  { id: 2, title: "Science Quiz" },
  { id: 3, title: "Math Quiz" },
  { id: 4, title: "Geography Quiz" },
];

function HomePage() {
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const navigate = useNavigate();

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      navigate(`/quiz/${selectedQuiz}`);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="intro-text">
        <h1>Welcome to QuizApp!</h1>
        <p>Your ultimate quiz challenge awaits. Select a quiz and let's start testing your knowledge!</p>
      </div>

      <div className="quiz-selector">
        <label htmlFor="quiz-select">Choose a quiz:</label>
        <select id="quiz-select" value={selectedQuiz} onChange={handleQuizChange}>
          <option value="">--Select a quiz--</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          ))}
        </select>
        <button onClick={handleStartQuiz} disabled={!selectedQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default HomePage;
