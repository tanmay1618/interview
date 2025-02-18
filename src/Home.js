import React, { useState } from 'react';
import InterviewTable from './InterviewTable';


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
        <InterviewTable/>
    </div>
  );
}

export default Home;

