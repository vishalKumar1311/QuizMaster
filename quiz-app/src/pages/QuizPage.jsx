import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';

const quizData = {
  1: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
  ],
  2: [
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "CO2", "H2O", "H2"],
      correctAnswer: "H2O",
    },
    {
      question: "What is the speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"],
      correctAnswer: "300,000 km/s",
    },
  ],
  3: [
    {
      question: "What is 5 + 7?",
      options: ["12", "14", "10", "11"],
      correctAnswer: "12",
    },
    {
      question: "What is 10 - 4?",
      options: ["6", "7", "5", "8"],
      correctAnswer: "6",
    },
  ],
  4: [
    {
      question: "Which is the largest continent?",
      options: ["Asia", "Africa", "Europe", "North America"],
      correctAnswer: "Asia",
    },
    {
      question: "Which is the longest river?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correctAnswer: "Nile",
    },
  ],
};

function QuizPage() {
  const { quizId } = useParams();
  const quiz = quizData[quizId]; // Get the quiz by quizId
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answer) => {
    if (answered) return; // Prevent changing answer after it's already been selected

    const isCorrect = answer === quiz[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz Over! Your score: ${score}/${quiz.length}`);
      navigate("/"); // Go back to the homepage after completing the quiz
    }
  };

  return (
    <div className="quiz-page">
      <h1>{quizId === "1" ? "General Knowledge Quiz" : "Science Quiz"}</h1>
      <QuestionCard
        question={quiz[currentQuestionIndex].question}
        options={quiz[currentQuestionIndex].options}
        correctAnswer={quiz[currentQuestionIndex].correctAnswer}
        onAnswer={handleAnswer}
        answered={answered}
      />
      <button onClick={handleNextQuestion} disabled={!answered}>
        Next Question
      </button>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default QuizPage;
