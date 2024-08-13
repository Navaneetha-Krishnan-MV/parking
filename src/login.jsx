// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';
// // import car from './Resources/car.mp4';
// // import axios from 'axios';
// // import { signInWithPopup } from 'firebase/auth';
// // import { auth, provider } from './firebase'; // Adjust according to your Firebase setup

// // function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [passwordError, setPasswordError] = useState(false); // Track wrong password
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { ema } = location.state || {};

// //   useEffect(() => {
// //     AOS.init();
// //   }, []);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setPasswordError(false); // Reset error state before submitting

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/login', {
// //         email,
// //         password,
// //       });

// //       if (response.data.success) {
// //         navigate('/main', { state: { email } });
// //       } else if (response.data.message === 'Wrong Password') {
// //           setPasswordError(true); // Set error state if password is wrong
// //         console.log(response.data.message);
// //       }else{
// //         alert("User Not found ");
// //         navigate('/signin');
// //       }
// //     } catch (error) {
// //       console.error('Login failed:', error);
// //       navigate('/signin');
// //     }
// //   };

// //   const handleSignInWithGoogle = async () => {
// //     try {
// //       const result = await signInWithPopup(auth, provider);
// //       const email = result.user.email;
// //       const displayName = result.user.displayName;

// //       setEmail(email);

// //       localStorage.setItem('email', email);
// //       localStorage.setItem('name', displayName);

// //       // Check if user exists in the database
// //       const response = await axios.post('http://localhost:5000/api/registration', {
// //         email,
// //         displayName,
// //       });

// //       if (response.data.success) {
// //         navigate('/main', { state: { email } });
// //       } else {
// //         navigate('/signin');
// //       }
// //     } catch (error) {
// //       console.error('Error signing in or registering user:', error);
// //     }
// //   };

// //   const out1 = () => {
// //     localStorage.clear();
// //     window.location.replace('/signin');
// //   };

// //   return (
// //     <div className="first">
// //       <div className="video-background">
// //         <div className="overla"></div>
// //         <video src={car} autoPlay loop muted />
// //         <div className="content" id="main">
// //           <div className="welcome-section">
// //             <h1 id="welcome" data-aos="fade-right" data-aos-duration="1000">Welcome</h1>
// //             <p id="welpara" data-aos="fade-right" data-aos-duration="1000">
// //               Welcome back to our innovative parking website!
// //               <br />
// //               Log in to continue your journey and enjoy our cutting-edge solutions.
// //               <br />
// //               We're thrilled to see you again and applaud your return!
// //             </p>
// //             <Link to="/about" className="in" data-aos="fade-right" data-aos-duration="1000">More Info</Link>
// //           </div>
// //           <div className="login-section" data-aos="fade-up" data-aos-duration="2000">
          
// //             <form id="fo" onSubmit={handleLogin} method="POST">
// //               <div className="input-group">
// //                 <label htmlFor="username" id="n">Useremail</label>
// //                 <input
// //                   type="text"
// //                   id="username"
// //                   name="username"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <div className="input-group">
// //                 <label htmlFor="password" id="p">Password</label>
// //                 <input
// //                   type="password"
// //                   id="password"
// //                   name="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   style={{
// //                     borderColor: passwordError ? 'red' : '', // Conditional border color
// //                   }}
// //                 />
// //                 {passwordError && (
// //                   <p style={{ color: 'red' }}>Wrong Password</p>
// //                 )}
// //               </div>
// //               <button type="submit" id="log">Login</button>
// //               <button type="button" id="googlebutton" onClick={handleSignInWithGoogle}>
// //                 Log in With Google
// //                 <i className="fa-brands fa-google" id="google"></i>
// //               </button>
// //               <h5 id="already">
// //                 Are you a new user?<Link to="/signin">Sign up</Link>
// //               </h5>
// //               {ema && <button onClick={out1}>Logout</button>}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;
































// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import axios from 'axios';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from './firebase'; // Adjust according to your Firebase setup
// import './Resources/styles/login.css'; // Import the CSS file

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { ema } = location.state || {};

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setPasswordError(false);

//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         navigate('/main', { state: { email } });
//       } else if (response.data.message === 'Wrong Password') {
//         setPasswordError(true);
//         console.log(response.data.message);
//       } else {
//         alert('User Not found');
//         navigate('/signin');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       navigate('/signin');
//     }
//   };

//   const handleSignInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const email = result.user.email;
//       const displayName = result.user.displayName;

//       setEmail(email);

//       localStorage.setItem('email', email);
//       localStorage.setItem('name', displayName);

//       const response = await axios.post('http://localhost:5000/api/registration', {
//         email,
//         displayName,
//       });

//       if (response.data.success) {
//         navigate('/main', { state: { email } });
//       } else {
//         navigate('/signin');
//       }
//     } catch (error) {
//       console.error('Error signing in or registering user:', error);
//     }
//   };

//   const out1 = () => {
//     localStorage.clear();
//     window.location.replace('/signin');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h1 className="login-title">Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className={passwordError ? 'error' : ''}
//             />
//             {passwordError && <p className="error-text">Wrong Password</p>}
//           </div>
//           <button type="submit" className="login-button">Login</button>
//           <button type="button" className="google-button" onClick={handleSignInWithGoogle}>
//             Log in With Google
//             <i className="fa-brands fa-google"></i>
//           </button>
//         </form>
//         <p className="signup-link">
//           New to our platform? <Link to="/signin">Sign up</Link>
//         </p>
//         {ema && <button onClick={out1}>Logout</button>}
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import lo from './Resources/Aboutimages/change.gif'; // Replace with your image path
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'; // Adjust according to your Firebase setup
import './Resources/styles/login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    const { ema } = location.state || {};

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPasswordError(false);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.success) {
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

      const response = await axios.post('http://localhost:5000/api/registration', {
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
            />
          </div>
          <div className="input-group1">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={passwordError ? 'error' : ''}
            />
            {passwordError && <p className="error-text">Wrong Password</p>}
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


