import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import img from "./Resources/parking-icon1.png";
import "./Resources/styles/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  const location = useLocation();
  const { email } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(require("./Resources/Aboutimages/aboutface.png"));
  const [displayName, setDisplayName] = useState('');
  const modalRef = useRef(null);


  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/user-details?email=${email}`)
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
    localStorage.clear();
    window.location.replace("/login");
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

        fetch('http://localhost:5000/api/uploadProfilePhoto', {
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

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <img src={img} alt="Logo" id="logo" />
          <h1 id="headertitle">
            <Link to="/" className="logo font-sans">
              <span>PARKING </span><span>WEBSITE</span>
            </Link>
          </h1>
          <ul className="nav-links">
            <li className="font-sans"><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {email ? (
              <>
                <li><Link to="/main" id="main-thing">Find Parking</Link></li>
                <i className="bi bi-person-circle" onClick={handleIconClick} id="userIcon" />
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signin">Sign up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {showModal && (
        <div id="userModal" className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div ref={modalRef} className="bg-gray-800 text-white rounded-lg w-72 p-6 mt-16 mr-4">
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
            <a href="/UserProfile" className="logo font-sans block py-2 hover:bg-gray-600 rounded">
  My Profile
</a>

              
              <a href="#" className="block py-2 hover:bg-gray-600 rounded">My Booking</a>
              <a href="#" className="block py-2 hover:bg-gray-600 rounded">Notification</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScpuO0DkUJgNaqGH7pM_KmuEklpAe4c2cRNPMlX3CHouJzCbg/viewform?pli=1" className="block py-2 hover:bg-gray-600 rounded">Become a Seller</a>
              <a href="#" className="block py-2 hover:bg-gray-600 rounded">Help</a>
              <a href="#" className="block py-2 hover:bg-gray-600 rounded">Settings</a>
             
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
