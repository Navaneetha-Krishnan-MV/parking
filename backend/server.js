import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import pdfMake from 'pdfmake';


const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

// Create transporter once at startup — not per-request
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: 'parkpuram7@gmail.com',
    pass: 'vznfgdwkvauaiomn',
  },
  tls: {
    rejectUnauthorized: false,
  },
});


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'parkings',
//   password: 'madhumitha',
//   port: 5432,
// });


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configure CORS with specific options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'https://parkpuram.vercel.app',
      'https://parking-0wap.onrender.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(json());


app.get('/api/slots', async (req, res) => {
  const { placeName, vehicleCategory } = req.query;

  if (!placeName || !vehicleCategory) {
    return res.status(400).json({ success: false, message: 'placeName and vehicleCategory are required' });
  }

  const tableName = placeName.replace(/ /g, '_'); 

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



app.get('/api/parking-places', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking_places');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



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

  const tableName = placeName.replace(/ /g, '_'); 
  
  
  try {
    if (vehicleCategory === "Two Wheeler") {
      await pool.query('UPDATE parking_places SET atcapacity = atcapacity - 1 WHERE name = $1', [placeName]);
    } else if (vehicleCategory === "Four Wheeler") {
      await pool.query('UPDATE parking_places SET afcapacity = afcapacity - 1 WHERE name = $1', [placeName]);
    }
   
    const insertQuery = `
      INSERT INTO vehcileemaildetails (place_name, vehicle_no, vehicle_category, start_time, end_time, booking_date, slot, profile_img, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
    `;
    const values = [placeName, vehicleNo, vehicleCategory, startTime, endTime, bookingDate, selectedSlot, profileImg, email];

    const result = await pool.query(insertQuery, values);

    console.log('User profile details saved:', result.rows[0]);

    
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

  const tableName = placeName.replace(/ /g, '_'); 

  try {
    
    const deleteQuery = `
      DELETE FROM vehcileemaildetails
      WHERE place_name = $1 AND slot = $2 RETURNING *;
    `;
    const deleteValues = [placeName, slotNo];
    const deleteResult = await pool.query(deleteQuery, deleteValues);

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }


    const updateSlotQuery = `
      UPDATE ${tableName}
      SET status = 'Available'
      WHERE vehicletype = $1 AND slotno = $2;
    `;
    const updateSlotValues = [vehicleCategory, slotNo];
    await pool.query(updateSlotQuery, updateSlotValues);

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


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

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
     
      const updateQuery = `
        UPDATE user_profile_details
        SET name = $1, phone_number = $2, dob = $3, gender = $4, address = $5
        WHERE email = $6 RETURNING *;
      `;
      const values = [name, phoneNumber, dob, gender, address, email];
      const result = await pool.query(updateQuery, values);

      res.status(200).json({ success: true, userProfile: result.rows[0] });
    } else {
     
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

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid email provided' });
  }

  try {

    
    const query = 'SELECT * FROM vehcileemaildetails WHERE email = $1';
    const values = [email];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      
      res.json({ success: true, bookings: result.rows });
    } else {
      
      res.json({ success: false, message: 'No bookings found for this email' });
    }
  } catch (err) {

    //

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



app.post('/send-booking-email', async (req, res) => {
  const {
    placeName,
    vehicleNo,
    vehicleCategory,
    startTime,
    endTime,
    bookingDate,
    slot,
    email,
    phoneNumber, // Add phone number to the request body
  } = req.body;

  console.log('Received booking details:', req.body);

  // HTML template for the email
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="text-align: center; color: #333;">Parkpuram Parking Bill</h2>
      <p style="text-align: center; color: #666;">Thank you for choosing Parkpuram. Below are your booking details.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Description</th>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f4f4f4;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Parking Place</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${placeName}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Vehicle Number</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${vehicleNo}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Vehicle Category</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${vehicleCategory}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Start Time</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${startTime}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">End Time</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${endTime}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Booking Date</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${bookingDate}</td>
          </tr>
          <tr>
            <td style="border-bottom: 1px solid #ddd; padding: 8px;">Slot Number</td>
            <td style="border-bottom: 1px solid #ddd; padding: 8px; text-align: right;">${slot}</td>
          </tr>
        </tbody>
      </table>
      <p style="text-align: center; color: #666; margin-top: 20px;">If you have any questions about your booking, please contact us at support@parkpuram.com.</p>
    </div>
  `;

  // Mail options
  const mailOptions = {
    from: 'parkpuram7@gmail.com',
    to: email,
    subject: 'Your Parkpuram Booking Confirmation',
    html: emailHTML,
  };

  // SMS body
  // const smsBody = `Thank you for booking at Parkpuram. Here are your booking details:
  // - Place: ${placeName}
  // - Vehicle: ${vehicleNo} (${vehicleCategory})
  // - Start Time: ${startTime}
  // - End Time: ${endTime}
  // - Date: ${bookingDate}
  // - Slot: ${slot}
  // `;

  try {
    // Send Email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');

    // Send SMS
    // await client.messages.create({
    //   body: smsBody,
    //   from: '+17634529657', // Replace with your Twilio phone number
    //   to: '+919787825610', // User's phone number
    // });
    // console.log('SMS sent successfully.');

    res.status(200).send('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email or SMS:', error);
    res.status(500).send('Error sending email or SMS: ' + error.toString());
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

