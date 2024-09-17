import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email1, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Retrieve email from location state
    const { email } = location.state || {};
    if (email) {
      setEmail(email);
    }
  }, [location.state]);

  const handleSave = async () => {
    const userProfile = { name, email1, phoneNumber, dob, gender, address };

    try {
      const response = await fetch('http://localhost:5000/api/profiledetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile details saved successfully!');
      } else {
        alert('Failed to save profile details.');
      }
    } catch (error) {
      console.error('Error saving profile details:', error);
      alert('Error saving profile details.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-profile-details/${email1}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile details deleted successfully!');
      } else {
        alert('Failed to delete profile details.');
      }
    } catch (error) {
      console.error('Error deleting profile details:', error);
      alert('Error deleting profile details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold">About me</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage your personal info and control who can see it when you use your main Google Account profile across Google services.
          </p>
        </div>

        <div className="px-6 py-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Basic info</h2>

          {/* Email (predefined) */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">{email1}</label>
            <p className="text-black"> up</p>
          </div>

          {/* Input for Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>

          {/* Input for Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>

          {/* Input for Profile Picture */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Profile picture</label>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-300 rounded-full flex justify-center items-center text-gray-700 text-xl font-bold">
                {name ? name.charAt(0) : 'R'}
              </div>
              <button className="ml-4 text-blue-500 text-sm font-semibold">Add a profile picture to personalize your account</button>
            </div>
          </div>

          {/* Input for DOB */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Birthday</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>

          {/* Input for Gender */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter your gender"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>

          {/* Input for Address */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>

          {/* Save and Delete Buttons */}
          <div className="flex justify-end space-x-4">
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
