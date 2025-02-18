
import InterviewReport from './InterviewReport';

import InterviewForm from './InterviewForm';

import { useContext } from 'react';
//import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route  } from 'react-router-dom';
import Login from './Login';  // Adjust the path as needed
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastProvider } from './BaseComponent/Toast/ToastContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <GoogleOAuthProvider clientId="692954892253-523tjknuuk0dqn0rd1sru6e0o4e6cq2k.apps.googleusercontent.com">
    <ToastProvider>
    <>

    <div className='App'>
    <Router>
        <Routes>
          <Route
          path="/"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home/></ProtectedRoute>}
          />
          <Route 
                path="/interview-report/:id" 
                element={<ProtectedRoute isAuthenticated={isAuthenticated}><InterviewReport /></ProtectedRoute>} />
          <Route 
                path="/interview-form/:id" 
                element={<ProtectedRoute isAuthenticated={isAuthenticated}><InterviewForm /></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
          {/* Add more routes here as needed */}
        </Routes>

    </Router>
    </div>
    </>
    </ToastProvider>
    </GoogleOAuthProvider>
  );
}

export default App;


