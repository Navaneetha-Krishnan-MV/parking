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
        <img src={lo} alt="Login Illustration" className="login-image" />
      </div>
      <div className="login-form">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please enter your details to sign in</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group1">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={emailError ? 'error' : ''}
            />
            {emailError && <p className="error-text">Please enter a valid email address</p>}
          </div>
          
          <div className="input-group1 password-wrapper">
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
            <span 
              className="password-toggle-icon1" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && <p className="error-text">Incorrect password. Please try again.</p>}
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button 
            type="button" 
            className="google-button-for-log" 
            onClick={handleSignInWithGoogle}
          >
            <i className="fa-brands fa-google"></i>
            Continue with Google
          </button>
          
          <p className="signup-link">
            Don't have an account? <Link to="/signin">Sign up</Link>
          </p>
          
          {ema && (
            <div className="logout-section">
              <button onClick={out1} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;


