import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizForm.css';

function QuizForm() {
  const [quizId, setQuizId] = useState('');
  const [quizName, setQuizName] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [timeLimit, setTimeLimit] = useState('');
  const [quizType, setQuizType] = useState('SHORT_ANSWER');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/questions/category');
        setCategories(response.data);
        setIsLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
        const response = await axios.get(
          `http://localhost:8081/questions/getQuestionsByCategory/${selectedCategory}`
        );
        setQuestions(response.data);
        setIsLoadingQuestions(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, [selectedCategory]);

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizId || !quizName || !timeLimit || !selectedCategory || selectedQuestions.length === 0) {
      alert('Please fill all fields and select at least one question.');
      return;
    }

    const newQuiz = {
      id: quizId,
      quizName,
      difficultyLevel,
      timeLimit,
      quizType,
      category: selectedCategory,
      questionIds: selectedQuestions,
    };

    try {
      const response = await axios.post('http://localhost:8080/quizzes', newQuiz);
      alert(`Quiz created successfully! ID: ${response.data.id}`);
      setQuizId('');
      setQuizName('');
      setDifficultyLevel('easy');
      setTimeLimit('');
      setQuizType('SHORT_ANSWER');
      setSelectedCategory('');
      setQuestions([]);
      setSelectedQuestions([]);
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div className="quiz-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create a New Quiz</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Time Limit (seconds)"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
            <option value="SHORT_ANSWER">Short Answer</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Category:</label>
          {isLoadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">--Select Category--</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedCategory && (
          <>
            <h4>Select Questions</h4>
            {isLoadingQuestions ? (
              <p>Loading questions...</p>
            ) : questions.length > 0 ? (
              <ul className="questions-list">
                {questions.map((q) => (
                  <li key={q.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(q.id)}
                        onChange={() => handleQuestionSelect(q.id)}
                      />
                      {q.questionText}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions found for this category</p>
            )}
          </>
        )}

        <button type="submit" className="submit-btn">
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizForm;
