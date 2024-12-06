import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null); // To store quiz data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState({}); // Store user answers as key-value pairs
  const [error, setError] = useState(null);

  // Fetch quiz data from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:8080/quizzes/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setQuiz(data.questions);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Could not load the quiz. Please try again later.');
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (answer) => {
    const currentQuestion = quiz[currentQuestionIndex];
    if (answered) return; // Prevent changing answer after it's already been selected

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);

    // Save the user's answer for the current question
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer, // Using question ID as key for the user's answer
    });
  };

  const handleShortAnswer = (e) => {
    const answer = e.target.value.trim();
    setAnswered(answer !== ""); // Enable Next button once there is an answer

    // Save the user's answer for the current question
    setUserAnswers({
      ...userAnswers,
      [quiz[currentQuestionIndex].id]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz completed!");
      submitAnswers(); // Submit answers when quiz is finished
    }
    setAnswered(false); // Reset the answer flag for the next question
  };

  const submitAnswers = async () => {
    const startTime = new Date().toISOString().slice(0, 19);; // Example start time
    const endTime = new Date().toISOString().slice(0, 19);; // Example end time

    const userId = 1; // Replace with actual user ID from context or state
    const answersToSubmit = Object.keys(userAnswers).map((questionId) => ({
      questionId: parseInt(questionId), // Ensure questionId is a number
      userAnswer: userAnswers[questionId],
    }));

try {
    // Construct query parameters using URLSearchParams
    const queryParams = new URLSearchParams({
      userId,
      quizId,
      startTime,
      endTime,
    }).toString();

    // Send the POST request with query parameters appended to the URL
    const response = await fetch(`http://localhost:8082/api/quiz/submitAnswers?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answersToSubmit),
    });

    if (!response.ok) {
      throw new Error('Error submitting answers');
    }

    alert("Your answers have been submitted successfully!");
    navigate("/"); // Navigate back to the homepage or any other page
  } catch (err) {
    console.error('Error submitting answers:', err);
    setError('Could not submit answers. Please try again later.');
  }
};

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const questionType = currentQuestion.questionType;

  return (
    <div className="quiz-page">
      <h1>{currentQuestion.questionText}</h1>

      {questionType === "SHORT_ANSWER" && (
        <div>
          <input
            type="text"
            onChange={handleShortAnswer}
            placeholder="Enter your answer"
          />
        </div>
      )}

      {questionType === "TRUE_FALSE" && (
        <div>
          <button onClick={() => handleAnswer("True")}>True</button>
          <button onClick={() => handleAnswer("False")}>False</button>
        </div>
      )}

      {questionType === "MULTIPLE_CHOICE" && (
        <div>
          {currentQuestion.choices.map((choice, index) => (
            <button key={index} onClick={() => handleAnswer(choice)}>
              {choice}
            </button>
          ))}
        </div>
      )}

      <button onClick={handleNextQuestion} disabled={!answered}>
        {currentQuestionIndex === quiz.length - 1 ? 'Submit Answers' : 'Next Question'}
      </button>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default QuizPage;
