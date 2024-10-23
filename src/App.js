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
import MyBookings from './MyBookings.jsx';

// In your routes definition

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
        <Route path="/my-bookings" element={<MyBookings />} />

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



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout';
// import Home from './Home';
// import About from './about.jsx';
// import Login from './login.jsx';
// import Signin from './signin.jsx';
// import Main from './main.jsx';
// import UserProfile from './UserProfile.jsx';
// import MyBookings from './MyBookings.jsx';
// import Help from './Help.jsx';
// import Footer from "./Footer.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/main" element={<Main />} />
//           <Route path="/UserProfile" element={<UserProfile />} />
//           <Route path="/my-bookings" element={<MyBookings />} />
//           <Route path="/Help" element={<Help />} />
//           <Route path="/footer" element={<Footer />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;