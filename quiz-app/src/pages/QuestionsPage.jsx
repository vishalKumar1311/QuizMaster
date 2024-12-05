// src/pages/QuestionsPage.jsx

import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import './QuestionsPage.css';

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [questionToEdit, setQuestionToEdit] = useState(null); // Track the question being edited

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const editQuestion = (editedQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.questionText === editedQuestion.questionText ? editedQuestion : q
    );
    setQuestions(updatedQuestions);
    setQuestionToEdit(null); // Reset the editing form
  };

  return (
    <div className="questions-page">
      <h2>Manage Questions</h2>

      <QuestionForm
        addQuestion={addQuestion}
        editQuestion={editQuestion}
        questionToEdit={questionToEdit}
      />

      <div className="questions-list">
        <h3>Questions List</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              <strong>{q.questionText}</strong>
              <button onClick={() => setQuestionToEdit(q)}>Edit</button>
              <button onClick={() => deleteQuestion(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuestionsPage;
