import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');
  const [options, setOptions] = useState(['']);
  const [questionId, setQuestionId] = useState(null); // Store question ID (for editing)

  const navigate = useNavigate();
  const { questionIdParam } = useParams(); // Get questionId from the URL (if editing)

  useEffect(() => {
    if (questionIdParam) {
      // Fetch the question by ID for editing
      axios
        .get(`http://localhost:8081/questions/getQuestion/${questionIdParam}`)
        .then((response) => {
          const { data } = response;
          setQuestionId(data.id);
          setQuestionText(data.questionText);
          setCorrectAnswer(data.correctAnswer);
          setCategory(data.category);
          setDifficulty(data.difficulty);
          setQuestionType(data.questionType);
          setOptions(data.choices || []);
        })
        .catch((error) => {
          console.error('Error fetching question:', error);
        });
    }
  }, [questionIdParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      questionText,
      correctAnswer,
      category,
      difficulty,
      questionType,
      choices: questionType === 'MULTIPLE_CHOICE' ? options : [],
    };

    try {
      if (questionId) {
        // Editing an existing question
        await axios.put(
          `http://localhost:8081/questions/updateQuestion/${questionId}`,
          newQuestion
        );
        alert('Question updated successfully');
      } else {
        // Adding a new question
        await axios.post('http://localhost:8081/questions/addQuestion', newQuestion);
        alert('Question added successfully');
      }
      navigate('/teacher-dashboard/questions/list'); // Redirect to the question list after submit
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question ID (Required)</label>
        <input
          type="text"
          value={questionId || ''}
          onChange={(e) => setQuestionId(e.target.value)}
          required
          disabled={!!questionId} // Disable ID field if editing
        />
      </div>

      <div>
        <label>Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Correct Answer</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label>Question Type</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="one_word">One Word Answer</option>
        </select>
      </div>

      {questionType === 'MULTIPLE_CHOICE' && (
        <div>
          <label>Options</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
      )}

      <button type="submit">
        {questionId ? 'Edit Question' : 'Add Question'}
      </button>
    </form>
  );
};

export default QuestionForm;
