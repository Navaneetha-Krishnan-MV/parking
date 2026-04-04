import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import img from "./Resources/parking-icon1.png";
import "./Resources/styles/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { User, Menu, X } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(require("./Resources/Aboutimages/aboutface.png"));
  const [displayName, setDisplayName] = useState('');
  const modalRef = useRef(null);
  const menuRef = useRef(null);

  // Re-read auth state from localStorage on every route change
  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, [location.pathname]);

  useEffect(() => {
    if (email) {
      
      fetch(`https://parking-0wap.onrender.com/api/user-details?email=${email}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setDisplayName(data.displayName);
          } else {
            console.error('Failed to fetch display name:', data.message);
          }
        })
        .catch(error => console.error('Error fetching display name:', error));
    }
  }, [email]);

  const out = () => {
    localStorage.removeItem('email'); // Clear email from localStorage on logout
    setEmail(null); // Reset the email state
    window.location.replace("/login"); // Redirect to login
  };

  const handleIconClick = () => {
    setShowModal(true);
    setIsMenuOpen(false); // Close mobile menu when opening profile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  const handleNavigation = (path) => {
    navigate(path, { state: { email } });
    handleCloseModal();
  };
  
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);

        // Send the image to the server
        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('email', email);  // Assuming email is a unique identifier

        fetch('https://parking-0wap.onrender.com/api/uploadProfilePhoto', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Photo uploaded successfully:', data);
        })
        .catch(error => {
          console.error('Error uploading photo:', error);
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center">
              <img src={img} alt="Logo" id="logo" className="h-12 w-auto" />
              <h1 id="headertitle" className="ml-2 mt-3">
                <Link to="/" className="logo font-sans">
                  <span>PARKING </span><span>WEBSITE</span>
                </Link>
              </h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <li className="font-sans"><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            {email ? (
              <>
                <li><Link to="/main" id="main-thing" onClick={closeMenu}>Find Parking</Link></li>
                <li className="md:hidden">
                  <button 
                    onClick={handleIconClick}
                    className="flex items-center text-white hover:text-green-600 cursor-pointer py-2 px-4 rounded-lg w-full text-left"
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span>My Account</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                <li><Link to="/signin" onClick={closeMenu}>Sign up</Link></li>
              </>
            )}
          </ul>
          
          {/* Desktop profile icon */}
          {/* {email && (
            <div className="hidden md:block">
              <User 
                className="w-8 h-8 text-white hover:text-green-600 cursor-pointer"
                onClick={handleIconClick}
                aria-label="User profile"
              />
            </div>
          )} */}
        </div>
      </nav>

      {showModal && (
       <div id="userModal" className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-40 backdrop-blur-sm z-50 md:items-center md:justify-center md:bg-opacity-70">
       <div ref={modalRef} className="bg-gray-800 text-white rounded-lg w-full max-w-xs md:max-w-sm p-6 mt-16 mr-4 md:mt-0 md:mr-0">
         <div className="flex flex-col items-center mb-6">
           <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full mb-4" id="p" />
           <span className="text-lg font-semibold">Hi, {displayName}</span>
           <label htmlFor="file-upload" className="cursor-pointer mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg">
             Edit Profile Photo
           </label>
           <input
             id="file-upload"
             type="file"
             accept="image/*"
             onChange={handleProfilePhotoChange}
             className="hidden"
           />
         </div>
         <div className="space-y-3 text-center">
           <button onClick={() => handleNavigation('/UserProfile')} className="w-full text-left py-2 hover:bg-gray-600 rounded">
             My Profile
           </button>
           <button onClick={() => handleNavigation('/my-bookings')} className="w-full text-left py-2 hover:bg-gray-600 rounded">
             My Booking
           </button>
           <button className="w-full text-left py-2 hover:bg-gray-600 rounded">Notification</button>
           <a href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?pli=1" className="block py-2 hover:bg-gray-600 rounded">Become Seller</a>
           <button onClick={() => handleNavigation('/Help')} className="w-full text-left py-2 hover:bg-gray-600 rounded">
             Help-Center
           </button>
           <button className="w-full text-left py-2 hover:bg-gray-600 rounded">Settings</button>
           <button
             className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
             onClick={out}
           >
             Logout
           </button>
         </div>
       </div>
     </div>
      )}
    </>
  );
}

export default Header;
