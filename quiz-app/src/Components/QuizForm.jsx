// src/components/QuizForm.jsx

import React, { useState } from 'react';

function QuizForm({ createQuiz, questions }) {
  const [quizName, setQuizName] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [timeLimit, setTimeLimit] = useState('');
  const [quizType, setQuizType] = useState('SHORT_ANSWER');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = {
      quizName,
      difficultyLevel,
      timeLimit,
      quizType,
      selectedQuestions,
    };
    createQuiz(newQuiz);
    setQuizName('');
    setTimeLimit('');
    setSelectedQuestions([]);
  };

  const handleQuestionSelect = (questionIndex) => {
    setSelectedQuestions((prevState) => {
      if (prevState.includes(questionIndex)) {
        return prevState.filter((index) => index !== questionIndex);
      } else {
        return [...prevState, questionIndex];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        required
      />
      <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="number"
        placeholder="Time Limit (seconds)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        required
      />
      <select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
        <option value="SHORT_ANSWER">Short Answer</option>
        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
      </select>

      <h4>Select Questions</h4>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedQuestions.includes(index)}
                onChange={() => handleQuestionSelect(index)}
              />
              {q.questionText}
            </label>
          </li>
        ))}
      </ul>

      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default QuizForm;
