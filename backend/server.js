import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();
const port = 5000;

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'parkings',
  password: 'madhumitha',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(json());


// // Route to fetch available slots
// app.get('/api/slots', (req, res) => {
//   const { placeName, vehicleCategory } = req.query;

//   if (!placeName || !vehicleCategory) {
//     return res.status(400).json({ success: false, message: 'placeName and vehicleCategory are required' });
//   }

//   const placeSlots = slots[placeName];
//   if (!placeSlots) {
//     return res.status(404).json({ success: false, message: 'Parking place not found' });
//   }

//   const categorySlots = placeSlots[vehicleCategory];
//   if (!categorySlots) {
//     return res.status(404).json({ success: false, message: 'Vehicle category not found' });
//   }

//   res.status(200).json({ success: true, slots: categorySlots });
// });
app.get('/api/slots', async (req, res) => {
  const { placeName, vehicleCategory } = req.query;

  if (!placeName || !vehicleCategory) {
    return res.status(400).json({ success: false, message: 'placeName and vehicleCategory are required' });
  }

  const tableName = placeName.replace(/ /g, '_'); // Replace spaces with underscores

  try {
    const query = `
      SELECT slotno, status
      FROM ${tableName}
      WHERE vehicletype = $1;
    `;
    
    const values = [vehicleCategory];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, slots: result.rows });
    } else {
      res.status(404).json({ success: false, message: 'No slots found for the specified place and vehicle category' });
    }
  } catch (err) {
    console.error('Error fetching slots:', err);
    res.status(500).json({ success: false, message: 'Error fetching slots' });
  }
});


// Get all parking places
app.get('/api/parking-places', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking_places');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Get user details by email
app.get('/api/user-details', async (req, res) => {
  const { email } = req.query;

  try {
    const result = await pool.query('SELECT display_name FROM registration WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      res.json({ success: true, displayName: result.rows[0].display_name });
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).send('Server error');
  }

});


app.post('/api/userprofiledetails', async (req, res) => {
  var { placeName, vehicleNo, vehicleCategory, startTime, endTime, bookingDate, selectedSlot, profileImg, email } = req.body;

  if (!placeName || !vehicleNo || !vehicleCategory || !startTime || !endTime || !bookingDate || selectedSlot === null || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const tableName = placeName.replace(/ /g, '_'); // Replace spaces with underscores
  
  
  try {
    if (vehicleCategory === "Two Wheeler") {
      await pool.query('UPDATE parking_places SET atcapacity = atcapacity - 1 WHERE name = $1', [placeName]);
    } else if (vehicleCategory === "Four Wheeler") {
      await pool.query('UPDATE parking_places SET afcapacity = afcapacity - 1 WHERE name = $1', [placeName]);
    }
    // Insert user profile details into the database
    const insertQuery = `
      INSERT INTO vehcileemaildetails (place_name, vehicle_no, vehicle_category, start_time, end_time, booking_date, slot, profile_img, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;
    const values = [placeName, vehicleNo, vehicleCategory, startTime, endTime, bookingDate, selectedSlot, profileImg, email];

    const result = await pool.query(insertQuery, values);

    console.log('User profile details saved:', result.rows[0]);

    // Update the slot status to 'Booked'
    const updateSlotQuery = `
      UPDATE ${tableName}
      SET status = 'Booked'
      WHERE vehicletype = $1 AND slotno = $2;
    `;
    const updateSlotValues = [vehicleCategory, selectedSlot];

    await pool.query(updateSlotQuery, updateSlotValues);


    res.status(200).json({ success: true, userProfile: result.rows[0] });
  } catch (err) {
    console.error('Error saving user profile details:', err);
    res.status(500).json({ success: false, message: 'Error saving user profile details' });
  }
});

app.delete('/api/deleteslot', async (req, res) => {
  const { placeName, slotNo, vehicleCategory } = req.body;

  if (!placeName || !slotNo || !vehicleCategory) {
    return res.status(400).json({ success: false, message: 'placeName, slotNo, and vehicleCategory are required' });
  }

  const tableName = placeName.replace(/ /g, '_'); // Replace spaces with underscores

  try {
    // Delete from vehcileemaildetails
    const deleteQuery = `
      DELETE FROM vehcileemaildetails
      WHERE place_name = $1 AND slot = $2 RETURNING *;
    `;
    const deleteValues = [placeName, slotNo];
    const deleteResult = await pool.query(deleteQuery, deleteValues);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    // Update the slot status to 'Available'
    const updateSlotQuery = `
      UPDATE ${tableName}
      SET status = 'Available'
      WHERE vehicletype = $1 AND slotno = $2;
    `;
    const updateSlotValues = [vehicleCategory, slotNo];
    await pool.query(updateSlotQuery, updateSlotValues);

    // Update the capacity based on vehicle category
    if (vehicleCategory === "Two Wheeler") {
      await pool.query('UPDATE parking_places SET atcapacity = atcapacity + 1 WHERE name = $1', [placeName]);
    } else if (vehicleCategory === "Four Wheeler") {
      await pool.query('UPDATE parking_places SET afcapacity = afcapacity + 1 WHERE name = $1', [placeName]);
    }

    res.status(200).json({ success: true, message: 'Slot deleted successfully' });
  } catch (err) {
    console.error('Error deleting slot:', err);
    res.status(500).json({ success: false, message: 'Error deleting slot' });
  }
});



// User registration
app.post('/api/registration', async (req, res) => {
  const { email, displayName } = req.body;
  console.log("Received registration request:", email, displayName);

  try {
    const userCheck = await pool.query('SELECT * FROM registration WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      console.log("User already registered:", email);
      return res.json({ success: true, message: 'User already registered' });
    }

    const query = 'INSERT INTO registration (email, display_name) VALUES ($1, $2) RETURNING *';
    const values = [email, displayName];

    const result = await pool.query(query, values);
    console.log("User registered successfully:", result.rows[0]);
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Server error');
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Check if the password matches
      if (user.password === password) {
        console.log("Login matches perfect");
        res.json({ success: true, user });
      } else {
        console.log("Password wrong");
        res.json({ success: false, message: 'Wrong Password' });
      }
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Server error');
  }
});

// User authentication registration
app.post('/api/authentication', async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  console.log("Entered in database");

  try {
    const checkQuery = 'SELECT email FROM authentication WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      res.status(409).json({ message: 'Email already exists. Please login.' });
    } else {
      const insertQuery = 'INSERT INTO authentication (email, password, phone_number) VALUES ($1, $2, $3)';
      await pool.query(insertQuery, [email, password, phoneNumber]);
      res.status(200).json({ message: 'Registration successful. Please login.' });
    }
  } catch (error) {
    console.error('Error saving login details:', error);
    res.status(500).json({ message: 'Error saving login details' });
  }
});

app.post('/api/profiledetails', async (req, res) => {
  const { name, email, phoneNumber, dob, gender, address } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM user_profile_details WHERE email = $1', [email]);

    if (userCheck.rows.length > 0) {
      // Update existing user profile
      const updateQuery = `
        UPDATE user_profile_details
        SET name = $1, phone_number = $2, dob = $3, gender = $4, address = $5
        WHERE email = $6 RETURNING *;
      `;
      const values = [name, phoneNumber, dob, gender, address, email];
      const result = await pool.query(updateQuery, values);

      res.status(200).json({ success: true, userProfile: result.rows[0] });
    } else {
      // Insert new user profile
      const insertQuery = `
        INSERT INTO user_profile_details (name, email, phone_number, dob, gender, address)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const values = [name, email, phoneNumber, dob, gender, address];
      const result = await pool.query(insertQuery, values);

      res.status(201).json({ success: true, userProfile: result.rows[0] });
    }
  } catch (err) {
    console.error('Error handling profile details:', err);
    res.status(500).json({ success: false, message: 'Error handling profile details' });
  }
});

// Delete user profile details
app.delete('/api/delete-profile-details/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const query = `
      DELETE FROM user_profile_details
      WHERE email = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [email]);

    if (result.rowCount > 0) {
      res.status(200).json({ success: true, message: 'Profile details deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Profile details not found.' });
    }
  } catch (err) {
    console.error('Error deleting profile details:', err);
    res.status(500).json({ success: false, message: 'Error deleting profile details' });
  }
});


app.post('/api/bookings-by-email', async (req, res) => {
  const { email } = req.body;

  // Validate the email input
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid email provided' });
  }

  try {
    // Query to fetch bookings by email
    const query = 'SELECT * FROM vehcileemaildetails WHERE email = $1';
    const values = [email];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      // Send success response with bookings
      res.json({ success: true, bookings: result.rows });
    } else {
      // No bookings found for the provided email
      res.json({ success: false, message: 'No bookings found for this email' });
    }
  } catch (err) {
    // Log the error and send error response
    console.error('Error fetching booking details:', err);
    res.status(500).json({ success: false, message: 'Error fetching booking details. Please try again later.' });
  }
});


  app.post('/api/bookings-by-email-and-vehicle', async (req, res) => {
  const { email, vehicleNo } = req.body;

  try {
    const query = 'SELECT * FROM vehcileemaildetails WHERE email = $1 AND vehicle_no = $2';
    const values = [email, vehicleNo];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.json({ success: true, bookings: result.rows });
    } else {
      res.json({ success: false, message: 'No bookings found' });
    }
  } catch (err) {
    console.error('Error fetching booking details:', err);
    res.status(500).json({ success: false, message: 'Error fetching booking details' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

