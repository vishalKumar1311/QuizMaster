import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ResultPage.css';

function ResultPage() {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/quiz/getResult/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch result');
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Could not load result. Please try again later.');
      }
    };

    fetchResult();
  }, [quizId]);

  return (
    <div className="result-page">
      <Navbar />
      <div className="result-content">
        <h1>Quiz Result</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : result ? (
          <div className="result-box">
            <div className="summary">
              <p><strong>Score:</strong> {result.score}</p>
              <p><strong>Time Taken:</strong> {result.timeTaken}</p>
              <p><strong>Start Time:</strong> {new Date(result.startTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(result.endTime).toLocaleString()}</p>
            </div>
            <h2>Question Results</h2>
            <table className="result-table">
              <thead>
                <tr>
                  <th>Question ID</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {result.questionResults.map((question, index) => (
                  <tr key={index}>
                    <td>{question.questionId}</td>
                    <td>{question.userAnswer}</td>
                    <td>{question.correctAnswer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
