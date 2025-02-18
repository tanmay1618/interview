import React, { useState } from 'react';


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
        {"Home"}
    </div>
  );
}

export default Home;

