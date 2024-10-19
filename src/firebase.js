import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "parkpuram.firebaseapp.com",
  projectId: "parkpuram",
  storageBucket: "parkpuram.appspot.com",
  messagingSenderId: "676007238177",
  appId: "1:676007238177:web:5d0b3bf88e48c59f6ae160"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};