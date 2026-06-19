import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

export default function App() {
  const [authView, setAuthView] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              authView={authView} 
              setAuthView={setAuthView} 
              showPassword={showPassword} 
              setShowPassword={setShowPassword} 
              theme={theme}
              toggleTheme={toggleTheme}
            />
          } 
        />
        <Route path="/workspace/:videoId" element={<WorkspacePage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/dashboard" element={<DashboardPage theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
}