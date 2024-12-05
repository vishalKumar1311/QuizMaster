// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded credentials
    if (username === 'teach' && password === 'teach') {
      navigate('/teacher-dashboard');
    } else if (username === 'stud' && password === 'stud') {
      navigate('/home');  // Redirect to the quiz page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h1>Login to QuizApp</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
