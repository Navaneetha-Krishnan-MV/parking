import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Resources/styles/PaymentModal.css";

const PaymentModal = ({ isOpen, onClose, tcapacitys, fcapacitys, email }) => {
  const [showModal, setShowModal] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [vehicleNo, setVehicleNo] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('Two Wheeler');
  const [showSlotBooking, setShowSlotBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [amount, setAmount] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    if (vehicleCategory === 'Two Wheeler') {
      setAmount(50);
    } else {
      setAmount(200);
    }
  }, [vehicleCategory]);

  useEffect(() => {
    if (showSlotBooking) {
      fetchSlots();
    }
  }, [showSlotBooking, vehicleCategory]);

  const fetchSlots = async () => {
    const placeName = localStorage.getItem('placeName');
    try {
      const response = await fetch(`http://localhost:5000/api/slots?placeName=${placeName}&vehicleCategory=${vehicleCategory}`);
      const data = await response.json();
      if (data.success) {
        console.log('Slots fetched:', data.slots); // Debug log
        setSlots(data.slots.sort((a, b) => a.slotno - b.slotno)); // Sort slots in ascending order
      } else {
        console.error('Error fetching slots:', data.message);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleSlotClick = (index) => {
    if (slots[index].status === 'Available') {
      setSelectedSlot(slots[index].slotno); // Store the actual slot number
    }
  };

  const handleSlotBooking = async () => {
    const email = localStorage.getItem('email');
    const placeName = localStorage.getItem('placeName');
  
    const userProfileData = {
      placeName,
      vehicleNo,
      vehicleCategory,
      startTime,
      endTime,
      bookingDate,
      selectedSlot, // Use the actual slot number
      profileImg: 'path_to_image.jpg',
      email
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/userprofiledetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });
  
      const data = await response.json();
      if (data.success) {
        console.log('User profile details saved:', data.userProfile);
        console.log({placeName});
        setBookingConfirmed(true);
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error saving user profile details:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {bookingConfirmed && (
        <div className="booking-confirmation">
          Booking Confirmed!
        </div>
      )}
      <div className={`background-blur ${isBlurred ? 'blurred' : ''}`}></div>
      <div className="payment-modal" id="paybox">
        <button className="close-button" onClick={onClose}>X</button>
        {!showSlotBooking ? (
          <>
            <h1 id="paytext">Book Slots & Payment</h1>
            <div className="input-group">
              <label htmlFor="vehicleNo" id="vehicleNo-label">Enter Vehicle no {email}</label>
              <input type="text" id="vehicleNo" name="vehicleNo" value={vehicleNo} required onChange={(e) => setVehicleNo(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="vehicleCategory" id="vehicleCategory-label">Enter Category</label>
              <select id="vehicleCategory" name="vehicleCategory" required value={vehicleCategory} onChange={(e) => setVehicleCategory(e.target.value)}>
                <option value="Two Wheeler">Two Wheeler</option>
                <option value="Four Wheeler">Four Wheeler</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bookingDate" id="bookingDate-label">Booking Date</label>
              <input type="date" id="bookingDate" name="bookingDate" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="startTime" id="startTime-label">Start Time</label>
              <input type="time" id="startTime" name="startTime" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="endTime" id="endTime-label">End Time</label>
              <input type="time" id="endTime" name="endTime" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowSlotBooking(true)} id="bookslots-button">Book Slots</button>
              <button onClick={onClose} id="close-button">Close</button>
            </div>
          </>
        ) : (
          <div>
            <div className="slot-booking-area">
              <h2>Select Your Slot</h2>
              <div className="slots-grid">
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`slot ${selectedSlot === slot.slotno ? "selected" : ""} ${slot.status !== 'Available' ? "unavailable" : ""}`}
                      onClick={() => handleSlotClick(index)}
                    >
                      {slot.slotno}
                    </div>
                  ))
                ) : (
                  <p>No slots available</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <p>Total Amount: ₹{amount}</p>
              <button onClick={handleSlotBooking} id="payment-button" disabled={selectedSlot === null}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;