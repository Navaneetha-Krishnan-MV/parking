import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import car from "./Resources/car.mp4";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import "./Resources/styles/Signin.css";

function Signin() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const displayName = result.user.displayName;
      
      setEmail(email);
      setName(displayName);
      
      localStorage.setItem("email", email);
      localStorage.setItem("name", displayName);

      // Send user data to the backend
      const response = await fetch('http://localhost:5000/api/registration', {
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
    console.log('Sign up button clicked');

    try {
        const response = await fetch('http://localhost:5000/api/authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password, phoneNumber }),
        });

        if (!response.ok) {
          navigate('/login');
          alert("email exists ");
            throw new Error('Failed to sign up user');
        }

        const r = await response.json();
        console.log('User signed up:', r);

        if (r.exists) {
            // Email already exists, redirect to login page
            alert('Email already exists. Redirecting to login page.');
            navigate('/login');
        } else {
            // Registration successful, redirect to main page
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
    <div className="first">
      <div className="video-background">
        <div className="overla"></div>
        <video src={car} autoPlay loop muted />
        
        <div className="content" id="main">
          <div className="welcome-section">
            <h1 id="welcome">Let's get started</h1>
            <p id="welpara">
              Welcome to our premier parking platform, where finding and reserving a parking spot <br />
              has never been easier. Sign up today to experience seamless navigation, real-time availability,<br />
              and secure transactions tailored to your needs. Join us now and make parking hassle-free!
            </p>
            <Link to="/about" className="in">More Info</Link>
          </div>
          <div className="login-section">
            <h1>Create an account</h1>
            <form id="fo" onSubmit={handleSignUp} method="POST">
              <div className="input-group">
                <label htmlFor="username" id="n">Useremail</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password" id="p">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phonenumber" id="p">Mobile number</label>
                <input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" id="log"  >Sign in</button>
              <button type="button" id="googlebutton" onClick={handleSignInWithGoogle}>
                Sign in With Google
                <i className="fa-brands fa-google" id="google"></i>
              </button>
              <h5 id="already">
                Are you an existing user?<Link to='/login'>Log-in</Link>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;