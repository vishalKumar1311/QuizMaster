// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import TeacherDashboard from './pages/TeacherDashboard';
import QuestionsPage from './pages/QuestionsPage';
import QuizzesPage from './pages/QuizzesPage';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/teacher-dashboard/questions/list" element={<QuestionList />} />
        <Route path="/teacher-dashboard/questions/edit/:questionId" element={<QuestionForm />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/teacher-dashboard/questions" element={<QuestionsPage />} />
        <Route path="/teacher-dashboard/quizzes" element={<QuizzesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
