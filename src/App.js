import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Wholelogin from "./Wholelogin";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Signin from "./signin"; 
import About from "./about";// Assuming you have a Home component
import Main from "./main";
import Help from "./Help.jsx";
import TermsandServices from "./TermsandServices.jsx";
import UserProfile from "./UserProfile.jsx";

const App = () => {


  return (
    <div>
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/TermsandServices" element={<TermsandServices />} />
        <Route path="/UserProfile" element={<UserProfile />} />


        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Wholelogin />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer></Footer>
    </Router>
    </div>
  );
};


export default App;
