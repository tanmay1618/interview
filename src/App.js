import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route  } from 'react-router-dom';
import './App.css';
import InterviewReport from './InterviewReport';
import Navbar from './Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
    <Navbar/>
    <Router>
        <Routes>
          <Route path="/interview-report/:id" element={<InterviewReport />} />
        </Routes>

    </Router>
    </div>
  );
}

export default App;

