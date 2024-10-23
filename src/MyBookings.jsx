import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [bookingDetails, setBookingDetails] = useState([]);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('email'); // Fetch email from localStorage

  const fetchBookingsByEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings-by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setBookingDetails(data.bookings); 
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch booking: ' + err.message);
      console.error('Fetch error:', err);
    }
  };

  const fetchBookingsByEmailAndVehicle = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings-by-email-and-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, vehicleNo }), 
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setBookingDetails(data.bookings); 
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch booking: ' + err.message);
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchBookingsByEmail();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-6">
        <button
          onClick={fetchBookingsByEmail}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          My Bookings
        </button>
        <div className="flex space-x-4 ml-[100px]">
          <input
            type="text"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value)}
            placeholder="Enter Vehicle Number"
            className="flex-grow py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={fetchBookingsByEmailAndVehicle}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Details
          </button>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
      {bookingDetails.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingDetails.map((booking, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <div className="p-6 space-y-2">
                <p className="text-lg font-semibold text-gray-800">{booking.vehicle_no}</p>
               <p className="text-sm text-gray-600"><span className="font-medium">Category:</span> {booking.vehicle_category}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Start:</span> {booking.start_time}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">End:</span> {booking.end_time}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {booking.booking_date}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {booking.email}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Slot:</span> {booking.slot}</p>
              
              <button
             className="absolute right-0 bottom-0 py-1 px-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                Cancel
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;