import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://localhost:8080/getAllQuizzes'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Could not load quizzes. Please try again later.');
      }
    };

    fetchQuizzes();
  }, []);

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
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <label htmlFor="quiz-select">Choose a quiz:</label>
            <select id="quiz-select" value={selectedQuiz} onChange={handleQuizChange}>
              <option value="">--Select a quiz--</option>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.quizName}
                </option>
              ))}
            </select>
            <button onClick={handleStartQuiz} disabled={!selectedQuiz}>
              Start Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
