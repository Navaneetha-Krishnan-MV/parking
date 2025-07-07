import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentModal from "./PaymentModal.jsx";

const UserProfile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email1, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [nameStore, setNameStore] = useState(''); 

  const location = useLocation();

  useEffect(() => {
    const { email } = location.state || {};
    if (email) {
      setEmail(email);
    }
  }, [location.state]);

  const handleSave = async () => {
    // Store the email to the nameStore variable
    setNameStore(email1); 

    const userProfile = { name, nameStore, phoneNumber, dob, gender, address }; 

    try {
      const response = await fetch('https://parking-0wap.onrender.com/api/profiledetails', {
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
      const response = await fetch(`https://parking-0wap.onrender.com/api/delete-profile-details/${email1}`, {
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl">
        <div className="border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">About me</h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage your personal info and control who can see it when you use your main Google Account profile across Google services.
          </p>
        </div>

        <div className="px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic info</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">{email1}</label>
              <p className="text-gray-900 font-semibold">
                
                <PaymentModal email={email1}/>
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-1">Birthday</label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-1">Gender</label>
              <input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter your gender"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button 
              onClick={handleDelete} 
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Delete
            </button>
            <button 
              onClick={handleSave} 
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;