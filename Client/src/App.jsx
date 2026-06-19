import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';
import './App.css';

export default function App() {
  const [authView, setAuthView] = useState(null); // Tracks 'login' | 'signup' | null
  const [showPassword, setShowPassword] = useState(false);

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
            />
          } 
        />
        <Route path="/workspace/:videoId" element={<WorkspacePage />} />
      </Routes>
    </Router>
  );
}