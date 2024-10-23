import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();
const port = 4000;

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'slots',
  password: 'madhumitha',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(json());




// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  