import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QuestionForm.css'; // Add this line to include the CSS file.

const QuestionForm = () => {
  const [id, setId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');
  const [options, setOptions] = useState(['']);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      id,
      questionText,
      correctAnswer,
      category,
      difficulty,
      questionType,
      choices: questionType === 'MULTIPLE_CHOICE' ? options : [],
    };

    try {
      await axios.post('http://localhost:8081/questions/addQuestion', newQuestion);
      alert('Question added successfully');
      navigate('/teacher-dashboard/questions/list');
    } catch (err) {
      console.error('Error submitting the question:', err);
      alert('There was an error. Please try again.');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <h2>Manage Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question ID </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter question ID"
          />
        </div>

        <div className="form-group">
          <label>Question Text</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Question Type</label>
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="one_word">One Word Answer</option>
          </select>
        </div>

        {questionType === 'MULTIPLE_CHOICE' && (
          <div className="form-group">
            <label>Options</label>
            {options.map((option, index) => (
              <div key={index} className="option-group">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="remove-option-btn"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="add-option-btn" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}

        <button type="submit" className="submit-btn">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;
