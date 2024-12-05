import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8081/questions/getAllQuestions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/questions/deleteQuestion/${id}`);
      alert('Question deleted successfully');
      setQuestions(questions.filter((question) => question.id !== id)); // Update local state
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Error deleting question');
    }
  };

  return (
    <div>
      <h1>Question List</h1>
      {questions.length === 0 ? (
        <p>No questions available</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <span>{question.questionText}</span>
              <Link to={`/teacher-dashboard/questions/edit/${question.id}`}>Edit</Link>
              <button onClick={() => handleDelete(question.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
