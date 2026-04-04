import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const productionDomains = [
  'parking-0wap.onrender.com',
  'your-production-domain.com'  // Replace with your actual production domain
];

const isProduction = productionDomains.includes(window.location.hostname);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIKWcg79R1FY9D6AxJCpiJM17LcmyHGqk",
  authDomain: "parkpuram.firebaseapp.com",
  projectId: "parkpuram",
  storageBucket: "parkpuram.appspot.com",
  messagingSenderId: "676007238177",
  appId: "1:676007238177:web:5d0b3bf88e48c59f6ae160"
};

// Initialize Firebase
let app;
let auth;
let provider;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Auth
  auth = getAuth(app);
  
  // Set persistence
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Auth persistence set to LOCAL');
    })
    .catch((error) => {
      console.error('Error setting auth persistence:', error);
    });
  
  // Initialize Google Auth Provider
  provider = new GoogleAuthProvider();
  
  // Add scopes if needed
  // provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  
  // Custom parameters
  provider.setCustomParameters({
    prompt: 'select_account',
    // Add domain verification if needed for your production domain
    // hd: isProduction ? 'your-domain.com' : undefined
  });
  
  console.log('Firebase initialized successfully');
  
} catch (error) {
  console.error('Firebase initialization error:', error);
  // You might want to show a user-friendly error message here
  if (isProduction) {
    // Log to error tracking service in production
    console.error('Production error details:', {
      location: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }
  
  // Re-throw to be handled by the application
  throw new Error('Failed to initialize Firebase. Please refresh the page or try again later.');
}

export { auth, provider };

// Add a helper function to check auth state
export const checkAuthState = (callback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in:', user.email);
    } else {
      console.log('No user is signed in');
    }
    if (callback) callback(user);
  });
};