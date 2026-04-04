import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Resources/styles/PaymentModal.css";

const BASE_URL = 'https://parking-0wap.onrender.com';

const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

const sendBookingEmail = async (booking) => {
  try {
    await fetch(`${BASE_URL}/send-booking-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placeName: booking.place_name,
        vehicleNo: booking.vehicle_no,
        vehicleCategory: booking.vehicle_category,
        startTime: booking.start_time,
        endTime: booking.end_time,
        bookingDate: formatDate(booking.booking_date),
        slot: booking.slot,
        email: booking.email,
      }),
    });
  } catch (error) {
    console.error('Error sending booking email:', error);
  }
};

const PaymentModal = ({ isOpen, onClose, placeName: propPlaceName }) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('Two Wheeler');
  const [showSlotBooking, setShowSlotBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState(null);
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const amount = vehicleCategory === 'Two Wheeler' ? 50 : 200;

  // Reset form state every time modal opens
  useEffect(() => {
    if (!isOpen) return;
    setVehicleNo('');
    setBookingDate('');
    setStartTime('');
    setEndTime('');
    setVehicleCategory('Two Wheeler');
    setShowSlotBooking(false);
    setSelectedSlot(null);
    setSlots(null);
    setBookingConfirmed(false);
    setErrors({});
  }, [isOpen]);

  // Resolve placeName only when modal is open
  useEffect(() => {
    if (!isOpen) return;
    if (propPlaceName) {
      setCurrentPlaceName(propPlaceName);
    } else {
      const stored = localStorage.getItem('placeName');
      if (stored) {
        setCurrentPlaceName(stored);
      } else {
        alert('No location selected. Please go back and select a location.');
        onClose();
      }
    }
  }, [isOpen, propPlaceName, onClose]);

  // Fetch slots whenever slot panel opens or vehicle category changes
  useEffect(() => {
    if (!isOpen || !showSlotBooking || !currentPlaceName) return;
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, showSlotBooking, vehicleCategory, currentPlaceName]);

  const fetchSlots = async () => {
    setSlots(null);
    try {
      const url = `${BASE_URL}/api/slots?placeName=${encodeURIComponent(currentPlaceName)}&vehicleCategory=${encodeURIComponent(vehicleCategory)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      if (data.success && data.slots) {
        setSlots([...data.slots].sort((a, b) => a.slotno - b.slotno));
      } else {
        setSlots([]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!vehicleNo.trim()) newErrors.vehicleNo = 'Vehicle number is required';
    if (!bookingDate) newErrors.bookingDate = 'Booking date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    if (startTime && endTime && startTime >= endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookSlotsClick = () => {
    if (validateForm()) {
      setShowSlotBooking(true);
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'Available') {
      setSelectedSlot(slot.slotno);
    }
  };

  const handleConfirmBooking = async () => {
    const email = localStorage.getItem('email');
    const bookingData = {
      placeName: currentPlaceName,
      vehicleNo,
      vehicleCategory,
      startTime,
      endTime,
      bookingDate,
      selectedSlot,
      profileImg: 'path_to_image.jpg',
      email,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/userprofiledetails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (data.success) {
        // Fire email in background — don't block navigation
        sendBookingEmail({
          place_name: currentPlaceName,
          vehicle_no: vehicleNo,
          vehicle_category: vehicleCategory,
          start_time: startTime,
          end_time: endTime,
          booking_date: bookingDate,
          slot: selectedSlot,
          email,
        });
        setBookingConfirmed(true);
        setTimeout(() => {
          onClose();
          navigate('/my-bookings');
        }, 2000);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      {bookingConfirmed && (
        <div className="booking-confirmation">
          ✓ Booking Confirmed! Redirecting...
        </div>
      )}
      <div className="payment-modal" id="paybox">
        <button className="close-button" onClick={onClose} aria-label="Close modal">✕</button>

        {!showSlotBooking ? (
          <>
            <h1 id="paytext">Book Slots &amp; Payment</h1>
            <p className="place-name-label">Location: <strong>{currentPlaceName}</strong></p>

            <div className="input-group">
              <label htmlFor="vehicleNo">Vehicle Number*</label>
              <input
                type="text"
                id="vehicleNo"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                placeholder="e.g. TN01AB1234"
              />
              {errors.vehicleNo && <span className="error">{errors.vehicleNo}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="vehicleCategory">Vehicle Category</label>
              <select
                id="vehicleCategory"
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value)}
              >
                <option value="Two Wheeler">Two Wheeler (₹50)</option>
                <option value="Four Wheeler">Four Wheeler (₹200)</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bookingDate">Booking Date*</label>
              <input
                type="date"
                id="bookingDate"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              {errors.bookingDate && <span className="error">{errors.bookingDate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="startTime">Start Time*</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              {errors.startTime && <span className="error">{errors.startTime}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="endTime">End Time*</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              {errors.endTime && <span className="error">{errors.endTime}</span>}
            </div>

            <div className="modal-footer">
              <button onClick={handleBookSlotsClick} id="bookslots-button">
                Book Slots
              </button>
              <button onClick={onClose} id="close-button">Cancel</button>
            </div>
          </>
        ) : (
          <div>
            <div className="slot-booking-area">
              <h2>Select Your Slot</h2>
              <p className="slot-subtitle">{currentPlaceName} — {vehicleCategory}</p>
              <div className="slots-grid">
                {slots === null ? (
                  <p className="loading-text">Loading slots...</p>
                ) : slots.length > 0 ? (
                  slots.map((slot) => (
                    <div
                      key={slot.slotno}
                      className={`slot ${selectedSlot === slot.slotno ? 'selected' : ''} ${slot.status !== 'Available' ? 'unavailable' : ''}`}
                      onClick={() => handleSlotClick(slot)}
                      title={slot.status !== 'Available' ? 'Slot not available' : `Slot ${slot.slotno}`}
                    >
                      {slot.slotno}
                    </div>
                  ))
                ) : (
                  <div className="no-slots-message">
                    <p>No slots available for {vehicleCategory} at this location.</p>
                    <p>Try a different vehicle category or check back later.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <p>Total: <strong>₹{amount}</strong></p>
              <button
                onClick={handleConfirmBooking}
                id="payment-button"
                disabled={!selectedSlot}
              >
                Confirm Booking
              </button>
              <button onClick={() => setShowSlotBooking(false)} id="close-button">
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
