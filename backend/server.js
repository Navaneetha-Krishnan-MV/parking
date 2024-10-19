import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';
require('dotenv').config();

const { Pool } = pkg;
const app = express();
const port = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(json());

app.get('/api/parking-places', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking_places');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add this route in your server.js
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
  const { vehicleNo,vehicleCategory, startTime, endTime, bookingDate, profileImg } = req.body;
  const timeValue = req.body.startTime;
  const etimeValue = req.body.endTime; // Assuming you're getting this from the request body

  const formattedStartTime = timeValue ? timeValue : null;
  const formattedTime = etimeValue ? etimeValue : null; // Use null if timeValue is empty

// Proceed with your query, using `formattedTime` instead of `timeValue`


  try {
      const insertQuery = `
          INSERT INTO userprofiledetails (vehicle_no,vehiclecategory, start_time, end_time, booking_date, profile_img)
          VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;
      `;
      
      const values = [vehicleNo,vehicleCategory, formattedStartTime, formattedTime, bookingDate, profileImg];

      const result = await pool.query(insertQuery, values);

      res.status(200).json({ success: true, userProfile: result.rows[0] });
  } catch (err) {
      console.error('Error saving user profile details:', err);
      res.status(500).json({ success: false, message: 'Error saving user profile details' });
  }
});



// registering for google
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


   // Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const result = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);

        if (result.rows.length > 0) {
          const user = result.rows[0];
          
          // Check if the password matches
          if (user.password === password) {
            console.log("Login matches perfect");
            res.json({ success: true, user: user });
          } else {
            console.log("Password wrong")
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

 // Routes
 app.post('/api/authentication', async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  console.log("entered in database");

  try {
    // Check if the email already exists in the registration table
    const checkQuery = 'SELECT email FROM authentication WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      // If the email exists, respond with a message
      
      res.status(409).json({ message: 'Email already exists. Please login.' });
    } else {
      // If the email does not exist, insert the new user details
      const insertQuery = 'INSERT INTO authentication (email, password, phone_number) VALUES ($1, $2, $3)';
      await pool.query(insertQuery, [email, password, phoneNumber]);
      res.status(200).json({ message: 'Registration successful. Please login.' });
    }
  } catch (error) {
    console.error('Error saving login details:', error);
    res.status(500).json({ message: 'Error saving login details' });
  }
});








// Register new user or update existing profile details
app.post('/api/profiledetails', async (req, res) => {
  const { name, email, phoneNumber, dob, gender, address } = req.body;

  try {
    // Check if user profile already exists
    const userCheck = await pool.query('SELECT * FROM user_profile_details WHERE email = $1', [email]);

    if (userCheck.rows.length > 0) {
      // If profile exists, update it
      const updateQuery = `
        UPDATE user_profile_details
        SET name = $1, phone_number = $2, dob = $3, gender = $4, address = $5
        WHERE email = $6 RETURNING *;
      `;
      const values = [name, phoneNumber, dob, gender, address, email];
      const result = await pool.query(updateQuery, values);

      res.status(200).json({ success: true, userProfile: result.rows[0] });
    } else {
      // If profile does not exist, insert new record
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

  

  const PORT = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });







// Delete profile details
// app.post('/api/profiledetails', async (req, res) => {
//   const { name, email, phoneNumber, dob, gender, address } = req.body;

//   try {
//     // Check if user profile already exists
//     const userCheck = await pool.query('SELECT * FROM user_profile_details WHERE email = $1', [email]);
//     if (userCheck.rows.length > 0) {
//       // Update existing user profile details
//       const updateQuery = `
//         UPDATE user_profile_details
//         SET name = $1, phone_number = $2, dob = $3, gender = $4, address = $5
//         WHERE email = $6 RETURNING *;
//       `;
//       const values = [name, phoneNumber, dob, gender, address, email];
//       const result = await pool.query(updateQuery, values);
//       res.status(200).json({ success: true, userProfile: result.rows[0] });
//     } else {
//       // Insert new user profile details
//       const insertQuery = `
//         INSERT INTO user_profile_details (name, email, phone_number, dob, gender, address)
//         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
//       `;
//       const values = [name, email, phoneNumber, dob, gender, address];
//       const result = await pool.query(insertQuery, values);
//       res.status(200).json({ success: true, userProfile: result.rows[0] });
//     }
//   } catch (err) {
//     console.error('Error saving user profile details:', err);
//     res.status(500).json({ success: false, message: 'Error saving user profile details' });
//   }
// });