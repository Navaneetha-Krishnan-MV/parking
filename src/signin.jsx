

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
      // Clear any previous errors
      setEmailError(false);
      
      console.log('Initiating Google Sign-In...');
      
      // Sign in with Google using Firebase Auth
      const result = await signInWithPopup(auth, provider).catch(error => {
        console.error('Popup error:', error);
        if (error.code === 'auth/popup-closed-by-user') {
          throw new Error('Sign-in popup was closed. Please try again.');
        }
        throw error;
      });
      
      const user = result.user;
      
      if (!user || !user.email) {
        throw new Error('No user information received from Google');
      }
      
      const email = user.email;
      const displayName = user.displayName || 'User';
      const photoURL = user.photoURL || '';
      
      console.log('Google Sign-In Successful:', { email, displayName });
      
      try {
        // Store user data in localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("name", displayName);
        if (photoURL) {
          localStorage.setItem("photoURL", photoURL);
        }
        console.log('User data stored in localStorage');

        // Send user data to the backend
        console.log('Sending user data to backend...');
        const response = await fetch('https://parking-0wap.onrender.com/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            displayName,
            authProvider: 'google',
            photoURL: photoURL || null
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Server responded with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Backend registration successful:', responseData);

        // Store auth token if provided
        if (responseData.token) {
          localStorage.setItem('token', responseData.token);
        }

        // Redirect to main page with user data
        navigate('/main', { 
          state: { 
            email,
            name: displayName,
            isNewUser: responseData.isNewUser || false,
            photoURL: photoURL || ''
          } 
        });
        
      } catch (error) {
        console.error('Error in post-authentication:', error);
        // Even if backend fails, proceed if we have user data
        if (email) {
          navigate('/main', { 
            state: { 
              email,
              name: displayName,
              photoURL: photoURL || ''
            } 
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error in Google Sign-In:', error);
      
      // Handle specific error cases
      let errorMessage = 'Failed to sign in with Google. ';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/account-exists-with-different-credential':
            errorMessage += 'An account already exists with this email but different sign-in method.';
            break;
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was canceled. Please try again.';
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = 'Only one popup request is allowed at a time.';
            break;
          case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
            break;
          default:
            errorMessage += error.message || 'Please try again later.';
        }
      } else {
        errorMessage += error.message || 'Please try again later.';
      }
      
      // Show error to user
      alert(errorMessage);
      
      // Clear any stored data on error
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('photoURL');
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

    if (storedEmail && storedName) {
      navigate('/main', { state: { email: storedEmail } });
    }
  }, [navigate]);

  return (
    <div className="signin-container">
      <div className="image-section-left">
        <img src={lo} alt="Sign Up Illustration" className="signin-image" />
      </div>
      <div className="signin-form">
        <h1 className="signin-title">Create an Account</h1>
        <p className="signin-subtitle">Join us today and get started</p>
        
        <form onSubmit={handleSignUp} method="POST">
          <div className="input-group7">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={emailError ? 'error' : ''}
            />
            {emailError && <p className="error-text">Please enter a valid email address</p>}
          </div>
          
          <div className="input-group7 password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={passwordError ? 'error' : ''}
            />
            <span 
              className="password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && (
              <p className="error-text">
                Password must be at least 8 characters long and include both letters and numbers
              </p>
            )}
          </div>
          
          <div className="input-group7">
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="Enter your mobile number (e.g., 9876543210)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={phoneNumberError ? 'error' : ''}
              maxLength="10"
              pattern="[0-9]{10}"
            />
            {phoneNumberError && (
              <p className="error-text">Please enter a valid 10-digit phone number</p>
            )}
          </div>
          
          <button type="submit" className="signin-button">
            Create Account
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button 
            type="button" 
            className="google-button" 
            onClick={handleSignInWithGoogle}
          >
            <i className="fa-brands fa-google"></i>
            Sign up with Google
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
          
          <div className="terms">
            By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;

