import React from 'react';

function QuestionCard({ question, options, correctAnswer, onAnswer, answered }) {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const optionClass = answered
            ? isCorrect
              ? 'correct'
              : 'incorrect'
            : '';

          return (
            <button
              key={index}
              className={`option ${optionClass}`}
              onClick={() => onAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
