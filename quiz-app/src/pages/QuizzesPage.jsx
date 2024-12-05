// src/pages/QuizzesPage.jsx

import React, { useState } from 'react';
import QuizForm from '../components/QuizForm';
import './QuizzesPage.css';

function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([
    { questionText: 'What is 2+2?', correctAnswer: '4' },
    { questionText: 'Is the sky blue?', correctAnswer: 'Yes' },
    { questionText: 'What is your name?', correctAnswer: 'John' },
  ]);

  const createQuiz = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  return (
    <div className="quizzes-page">
      <h2>Create and Manage Quizzes</h2>

      <QuizForm createQuiz={createQuiz} questions={questions} />

      <div className="quizzes-list">
        <h3>Existing Quizzes</h3>
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              <strong>{quiz.quizName}</strong>
              <p>Time Limit: {quiz.timeLimit} seconds</p>
              <p>Difficulty Level: {quiz.difficultyLevel}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuizzesPage;
