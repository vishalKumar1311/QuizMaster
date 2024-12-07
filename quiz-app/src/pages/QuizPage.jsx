import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:8080/quizzes/${quizId}`);
        if (!response.ok) throw new Error('Failed to fetch quiz data');
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
    if (answered) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) setScore(score + 1);
    setAnswered(true);

    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer,
    });
  };

  const handleShortAnswer = (e) => {
    const answer = e.target.value.trim();
    setAnswered(answer !== "");

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
      submitAnswers();
    }
    setAnswered(false);
  };

  const submitAnswers = async () => {
    const startTime = new Date().toISOString().slice(0, 19);
    const endTime = new Date().toISOString().slice(0, 19);

    const userId = 1;
    const answersToSubmit = Object.keys(userAnswers).map((questionId) => ({
      questionId: parseInt(questionId),
      userAnswer: userAnswers[questionId],
    }));

    try {
      const queryParams = new URLSearchParams({
        userId,
        quizId,
        startTime,
        endTime,
      }).toString();

      const response = await fetch(`http://localhost:8082/api/quiz/submitAnswers?${queryParams}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answersToSubmit),
      });

      if (!response.ok) throw new Error('Error submitting answers');
      alert("Your answers have been submitted successfully!");
      navigate("/");
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
          <button
            onClick={() => handleAnswer("True")}
            className={userAnswers[currentQuestion.id] === "True" ? "selected" : ""}
          >
            True
          </button>
          <button
            onClick={() => handleAnswer("False")}
            className={userAnswers[currentQuestion.id] === "False" ? "selected" : ""}
          >
            False
          </button>
        </div>
      )}

      {questionType === "MULTIPLE_CHOICE" && (
        <div>
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(choice)}
              className={userAnswers[currentQuestion.id] === choice ? "selected" : ""}
            >
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
