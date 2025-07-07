

// export default Signin;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import lo from './Resources/lo.gif'; // Replace with your image path
import rightImage from './Resources/logsign.gif'; // Replace with your right image path
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import "./Resources/styles/Signin.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

// Regex patterns for validation
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^\+91\d{10}$/; // Validates +91 followed by 10 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Allow special characters in the password

function Signin() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      // Get the current origin dynamically
      const currentOrigin = window.location.origin;
      
      // Set the redirect URL based on the current environment
      const redirectUrl = currentOrigin.includes('localhost') 
        ? 'http://localhost:3000' 
        : currentOrigin;
      
      // Update the provider with the correct redirect URL
      const customProvider = {
        ...provider,
        customParameters: {
          redirect_uri: redirectUrl
        }
      };

      const result = await signInWithPopup(auth, customProvider);
      const email = result.user.email;
      const displayName = result.user.displayName || 'User';
      
      setEmail(email);
      setName(displayName);
      
      localStorage.setItem("email", email);
      localStorage.setItem("name", displayName);

      // Send user data to the backend - using relative URL
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, displayName }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const r = await response.json();
      console.log('User registered:', r);

      // Redirect to main page
      navigate('/main', { state: { email } });
    } catch (error) {
      console.error('Error signing in or registering user:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validation checks
    const isEmailValid = emailRegex.test(username);
    const isPasswordValid = passwordRegex.test(password);
    const isPhoneNumberValid = phoneNumberRegex.test(`+91${phoneNumber}`);
    
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setPhoneNumberError(!isPhoneNumberValid);
    
    if (!isEmailValid || !isPasswordValid || !isPhoneNumberValid) {
      return;
    }

    try {
        const response = await fetch('https://parking-0wap.onrender.com/api/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password, phoneNumber: `+91${phoneNumber}` }),
        });

        if (!response.ok) {
          navigate('/login');
          alert("Email exists ");
            throw new Error('Failed to sign up user');
        }

        const r = await response.json();
        console.log('User signed up:', r);

        if (r.exists) {
            alert('Email already exists. Redirecting to login page.');
            navigate('/login');
        } else {
            navigate('/main', { state: { email: username } });
        }

    } catch (error) {
        console.error('Error signing up user:', error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || '';
    const storedName = localStorage.getItem("name") || '';

    setEmail(storedEmail);
    setName(storedName);

    if (storedEmail && storedName) {
      navigate('/main', { state: { email: storedEmail } });
    }
  }, [email, name, navigate]);

  return (
    <div className="signin-container">
      <div className="image-section-left">
        <img src={lo} alt="Left side visual" />
      </div>
      <div className="signin-form">
        <h1 className="signin-title">Create an account</h1>
        <form onSubmit={handleSignUp} method="POST">
          <div className="input-group7">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={emailError ? 'error' : ''}
            />
            {emailError && <p className="error-text">Invalid Email Format</p>}
          </div>
          <div className="input-group7 password-wrapper">
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
          
            
            {passwordError && <p className="error-text">Password incorrect format</p>}
          </div>
          <span id="eye"
              className="password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          <div className="input-group7">
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter your mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={phoneNumberError ? 'error' : ''}
            />
            {phoneNumberError && <p className="error-text">Phone number must be 10 digits</p>}
          </div>
          <button type="submit" className="signin-button">Sign in</button>
          <button type="button" className="google-button" onClick={handleSignInWithGoogle}>
            Sign in With Google
            <i className="fa-brands fa-google"></i>
          </button>
        </form>
        <p className="login-link">
          Are you an existing user? <Link to='/login'>Log in</Link>
        </p>
      </div>
      <div className="image-section-right">
        <img src={rightImage} alt="Right side visual" />
      </div>
    </div>
  );
}

export default Signin;

