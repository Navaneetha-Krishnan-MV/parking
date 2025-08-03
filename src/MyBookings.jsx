import React, { useState, useEffect } from 'react';
import styles from './Resources/styles/MyBookings.module.css';

const MyBookings = () => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [bookingDetails, setBookingDetails] = useState([]);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('email');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const fetchBookingsByEmail = async () => {
    try {
      const response = await fetch('https://parking-0wap.onrender.com/api/bookings-by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        const formattedBookings = data.bookings.map(booking => ({
          ...booking,
          booking_date: formatDate(booking.booking_date),
        }));
        setBookingDetails(formattedBookings);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch booking: ' + err.message);
    }
  };

  const handleDelete = async (booking) => {
    try {
      const response = await fetch('https://parking-0wap.onrender.com/api/deleteslot', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeName: booking.place_name,
          slotNo: booking.slot,
          vehicleCategory: booking.vehicle_category,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingDetails(prevDetails => prevDetails.filter(b => b.slot !== booking.slot));
        console.log('Slot deleted successfully');
      } else {
        console.error('Error deleting slot:', data.message);
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const fetchBookingsByEmailAndVehicle = async () => {
    if (!vehicleNo) {
      setError('Please enter the vehicle number.');
      return;
    }

    try {
      const response = await fetch('https://parking-0wap.onrender.com/api/bookings-by-email-and-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, vehicleNo }),
      });

      const data = await response.json();
      if (data.success) {
        const formattedBookings = data.bookings.map(booking => ({
          ...booking,
          booking_date: formatDate(booking.booking_date),
        }));
        setBookingDetails(formattedBookings);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch booking: ' + err.message);
    }
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

  const handleBookClick = async (booking) => {
    // Automatically send the email when the user books a slot
    await sendBookingEmail(booking);
  };

  useEffect(() => {
    fetchBookingsByEmail();
  }, []);

  return (
    <div className={styles.container} style={{ overflow: 'hidden' }}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <button
            onClick={fetchBookingsByEmail}
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Show All My Bookings
          </button>
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
            <input
              type="text"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              placeholder="Enter Vehicle Number"
              className={styles.inputField}
              onKeyPress={(e) => e.key === 'Enter' && fetchBookingsByEmailAndVehicle()}
            />
            <button
              onClick={fetchBookingsByEmailAndVehicle}
              className={`${styles.button} ${styles.primaryButton}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              Search
            </button>
          </div>
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      {bookingDetails.length > 0 ? (
        <div>
          <h2 className={styles.header}>Your Booking Details</h2>
          <div className={styles.bookingsGrid}>
            {bookingDetails.map((booking, index) => (
              <div key={index} className={styles.bookingCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>Booking #{index + 1}</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Vehicle:</span>
                    <span className={styles.detailValue}>{booking.vehicle_no}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span className={styles.detailValue}>{booking.place_name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Category:</span>
                    <span className={styles.detailValue}>{booking.vehicle_category}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Timing:</span>
                    <span className={styles.detailValue}>{booking.start_time} - {booking.end_time}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span className={styles.detailValue}>{booking.booking_date}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Slot:</span>
                    <span className={styles.detailValue}>#{booking.slot}</span>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handleDelete(booking)}
                      className={`${styles.button} ${styles.secondaryButton}`}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No bookings found. Make a new booking to see it here!</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;