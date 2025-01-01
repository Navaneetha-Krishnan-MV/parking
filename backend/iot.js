import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import pkg from 'pg';
import stringSimilarity from 'string-similarity';
import { fileURLToPath } from 'url';

const app = express();
const port = 8000;
const { Client } = pkg;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'dupload');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `scanned_img_${Date.now()}.jpg`);
  }
});

const upload = multer({ storage });

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'parkings',
  password: 'madhumitha',
  port: 5432,
});

client.connect();

app.post('/upload', upload.single('file'), async (req, res) => {
  const receivedImagePath = req.file.path;
  console.log("Received image saved at:", receivedImagePath);

  const preprocessedPath = path.join(uploadsDir, `preprocessed_${path.parse(req.file.originalname).name}.jpg`);
  const textOutputPath = path.join(uploadsDir, `${path.parse(req.file.originalname).name}.txt`);

  try {
    console.log("Starting image preprocessing...");

    // Preprocess the image
    await sharp(receivedImagePath)
      .resize(800, null, { withoutEnlargement: true })
      .greyscale()
      .normalize()
      .sharpen()
      .threshold(128)
      .jpeg({ quality: 100 })
      .toFile(preprocessedPath);

    console.log("Preprocessing completed, starting OCR...");

    // Recognize text from the preprocessed image
    const { data: { text } } = await tesseract.recognize(preprocessedPath, 'eng', {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      tessedit_pageseg_mode: '7',
      preserve_interword_spaces: '1',
    });

    console.log("OCR completed. Recognized Text: ", text);

    // Clean up the recognized text
    const cleanedText = text.trim()
      .replace(/\s+/g, ' ')
      .replace(/[^A-Z0-9\s]/g, '');

    console.log("Cleaned Text: ", cleanedText);

    // Query database for vehicle numbers
    const query = 'SELECT vehicleno FROM v';
    const result = await client.query(query);
    console.log("Database query executed.");

    let isVehicleFound = false;

    // Check for matches with string similarity
    for (let row of result.rows) {
      const dbVehicleNo = row.vehicleno;
      const similarity = stringSimilarity.compareTwoStrings(cleanedText, dbVehicleNo);

      console.log(`Comparing with DB entry: ${dbVehicleNo}, Similarity: ${similarity}`);

      if (similarity >= 0.8) {
        isVehicleFound = true;
        break;
      }
    }

    // Save cleaned text to file and remove preprocessed image
    fs.writeFileSync(textOutputPath, cleanedText, 'utf8');
    fs.unlinkSync(preprocessedPath);

    console.log("Text output saved at:", textOutputPath);

    // Send response based on whether the vehicle number was found
    if (isVehicleFound) {
      res.send('true');
      console.log("Vehicle number found in database.");
    } else {
      res.send('false');
      console.log("Vehicle number not found in database.");
    }

  } catch (error) {
    console.error("Error processing image:", error.message);
    res.status(500).send(`Error processing image: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
