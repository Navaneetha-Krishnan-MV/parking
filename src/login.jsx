import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';// Replace with your image path
import axios from 'axios';
import lo from "./Resources/Aboutimages/change.gif"

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'; // Adjust according to your Firebase setup
import './Resources/styles/login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// Import the CSS file


const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    
  const { ema } = location.state || {};

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPasswordError(false);
  
    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
  
    try {
      const response = await axios.post('https://parking-0wap.onrender.com/api/login', {
        email,
        password,
      });
  
      if (response.data.success) {
        localStorage.setItem('email', email); // Store email in localStorage
        navigate('/main', { state: { email } });
      } else if (response.data.message === 'Wrong Password') {
        setPasswordError(true);
        console.log(response.data.message);
      } else {
        alert('User Not found');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Login failed:', error);
      navigate('/signin');
    }
  };
  

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const displayName = result.user.displayName;

      setEmail(email);

      localStorage.setItem('email', email);
      localStorage.setItem('name', displayName);

      const response = await axios.post('https://parking-0wap.onrender.com/api/registration', {
        email,
        displayName,
      });

      if (response.data.success) {
        navigate('/main', { state: { email } });
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing in or registering user:', error);
    }
  };

  const out1 = () => {
    localStorage.clear();
    window.location.replace('/signin');
  };

  return (
    <div className="login-container">
    <div className="image-section">
      <img src={lo} alt="Sample" className="login-image" />
    </div>
    <div className="login-form">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group1">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={emailError ? 'error' : ''}
          />
          {emailError && <p className="error-text">Invalid Email Format</p>}
        </div>
        <div className="input-group1">
          <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={passwordError ? 'error' : ''}
          />
          {passwordError && <p className="error-text">Wrong Password</p>}
          <span id="eye"
              className="password-toggle-icon1" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
       
        <button type="submit" className="login-button">Login</button>
        <button type="button" className="google-button-for-log" onClick={handleSignInWithGoogle}>
          Log in With Google
          <i className="fa-brands fa-google"></i>
        </button>
      </form>
      <p className="signup-link">
        New to our platform? <Link to="/signin">Sign up</Link>
      </p>
      {ema && <button onClick={out1}>Logout</button>}
    </div>
  </div>
  );
}

export default Login;


