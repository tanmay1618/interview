import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from './constants';
import { GoogleLogin } from '@react-oauth/google';
import { getList } from './apis/api';
//import LogoLight from './BaseComponents/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //console.log("API_URL",API_URL)

  const onboardingRedirect= async ()=>{
    const data = await getList("onboarding")
    //console.log("onboarding data",data)
    if(data.length > 0){
        if(!data[0]['completed']){
          window.location.href = '/onboarding';
        }else{
          window.location.href = '/';
        }
    }else{
      window.location.href = '/onboarding';
    }
  }

  const googleLoginUser = async (credential) => {
    try {
      const response = await axios.post(`${API_URL}/google-login`, {
        credential: credential,
      });
  
     // console.log('Response:', response.data);
      
      Cookies.set('userId', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
      Cookies.set('botId', response.data.bot_id, { expires: 1, secure: true, sameSite: 'Strict' });
      if(response.data.bot_id === null){
        onboardingRedirect();
      }else{
        window.location.href = '/';
      }
      //alert("User logged in")
    } catch (error) {
      //console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: username,
        password: password
      });
  
      //console.log('Response:', response.data);
      
      Cookies.set('userId', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
      //Cookies.set('botId', response.data.bot_id, { expires: 1, secure: true, sameSite: 'Strict' });
      window.location.href = '/';
      
      //alert("User logged in")
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (email === '' || password === '') {
      setError('Email and password are required');
    } else {
      setError('');
      loginUser(email, password)
      //alert(`Logged in with email: ${email}`);
      // You would typically send email and password to your API here
    }
  };

  const handleSuccess = (credentialResponse) => {
    //console.log("login successful",credentialResponse);
    googleLoginUser(credentialResponse)

  };

  const handleError = () => {
    //console.log('Login Failed');
  };

  return (
    <div className="login-container" style={styles.container}>
      {/*<LogoLight/>*/}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      <br></br>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </form>
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#6E3ECD',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  }
};

export default Login;
