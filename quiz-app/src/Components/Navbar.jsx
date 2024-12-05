// src/components/Navbar.jsx

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>QuizApp</h2>
      </div>
      <div className="navbar-right">
        <p>Profile: John Doe</p>
      </div>
    </nav>
  );
}

export default Navbar;
