

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import img from "./Resources/parking-icon1.png";
import "./Resources/styles/Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header() {
  const location = useLocation();
  const { email } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(require("./Resources/Aboutimages/aboutface.png"));

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

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <img src={img} alt="Logo" id="logo" />
          <Link to="/" className="logo font-sans">Parking Website</Link>
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
        <>
          <div id="userModal" className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>User Profile</h2>
              <div className="profile-section">
                <img src={profilePhoto} alt="Profile" id="p" />
                <form>
                  <label htmlFor="profilePhoto" className="file-label">Edit Profile Photo</label>
                  <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" onChange={handleProfilePhotoChange} />
                </form>
              </div>
              <div className="info-section">
                <p><strong>Email:</strong> {email || "john.doe@example.com"}</p>
                <p><strong>Member since:</strong> January 1, 2020</p>
                <button className="edit-btn">Edit Profile</button>
                <button className="logout-btn" onClick={out}>Logout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;

