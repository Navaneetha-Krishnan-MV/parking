import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Resources/styles/PaymentModal.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const sendBookingEmail = async (booking) => {
  try {
    const formattedBookingDate = formatDate(booking.booking_date);
    const response = await fetch('https://parking-0wap.onrender.com/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeName: booking.place_name,
        vehicleNo: booking.vehicle_no,
        vehicleCategory: booking.vehicle_category,
        startTime: booking.start_time,
        endTime: booking.end_time,
        bookingDate: formattedBookingDate,
        slot: booking.slot,
        email: booking.email,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('Email sent successfully');
    } else {
      console.error('Error sending email:', data.message);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

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
  const [errors, setErrors] = useState({});
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

  // Initial fetch when component mounts
  useEffect(() => {
    if (isOpen && showSlotBooking) {
      fetchSlots();
    }
  }, [isOpen]);

  const fetchSlots = async () => {
    const placeName = localStorage.getItem('placeName');
    if (!placeName) {
      console.error('No placeName found in localStorage');
      return;
    }
    
    console.log('Fetching slots for place:', placeName, 'category:', vehicleCategory);
    
    try {
      const response = await fetch(`https://parking-0wap.onrender.com/api/slots?placeName=${encodeURIComponent(placeName)}&vehicleCategory=${encodeURIComponent(vehicleCategory)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);
      
      if (data.success) {
        const sortedSlots = [...data.slots].sort((a, b) => a.slotno - b.slotno);
        console.log('Sorted slots:', sortedSlots);
        setSlots(sortedSlots);
      } else {
        console.error('API returned error:', data.message);
        setSlots([]); // Reset slots on error to show empty state
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]); // Reset slots on error to show empty state
    }
  };

  const handleSlotClick = (index) => {
    if (slots[index].status === 'Available') {
      setSelectedSlot(slots[index].slotno); 
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
      selectedSlot, 
      profileImg: 'path_to_image.jpg',
      email
    };
  
    try {
      const response = await fetch('https://parking-0wap.onrender.com/api/userprofiledetails', {
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

        await sendBookingEmail({
          place_name: placeName,
          vehicle_no: vehicleNo,
          vehicle_category: vehicleCategory,
          start_time: startTime,
          end_time: endTime,
          booking_date: bookingDate,
          slot: selectedSlot,
          email: email
        });

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

  const validateForm = () => {
    const newErrors = {};
    if (!vehicleNo) newErrors.vehicleNo = 'Vehicle number is required';
    if (!bookingDate) newErrors.bookingDate = 'Booking date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookSlotsClick = () => {
    if (validateForm()) {
      setShowSlotBooking(true);
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
              <label htmlFor="vehicleNo" id="vehicleNo-label">Enter Vehicle no*</label>
              <input type="text" required id="vehicleNo" name="vehicleNo" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
              {errors.vehicleNo && <span className="error text-red-500">{errors.vehicleNo}*</span>}
            </div>

            <div className="input-group">
              <label htmlFor="vehicleCategory" id="vehicleCategory-label">Enter Category</label>
              <select id="vehicleCategory" name="vehicleCategory" required value={vehicleCategory} onChange={(e) => setVehicleCategory(e.target.value)}>
                <option value="Two Wheeler">Two Wheeler</option>
                <option value="Four Wheeler">Four Wheeler</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bookingDate" id="bookingDate-label">Booking Date*</label>
              <input type="date" id="bookingDate" name="bookingDate" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
              {errors.bookingDate && <span className="error text-red-500">{errors.bookingDate}*</span>}
            </div>

            <div className="input-group">
              <label htmlFor="startTime" id="startTime-label">Start Time*</label>
              <input type="time" id="startTime" name="startTime" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              {errors.startTime && <span className="error text-red-500">{errors.startTime}*</span>}
            </div>

            <div className="input-group">
              <label htmlFor="endTime" id="endTime-label">End Time*</label>
              <input type="time" id="endTime" name="endTime" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              {errors.endTime && <span className="error text-red-500">{errors.endTime}*</span>}
            </div>

            <div className="modal-footer">
              <button onClick={handleBookSlotsClick} id="bookslots-button">Book Slots</button>
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