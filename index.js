const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Using promises-based fs module

const app = express();
const port = 80;
const noticesFile = 'notices.json'; // File to store notices

let notices = []; // Array to store notices in memory

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to load notices from file
async function loadNotices() {
  try {
    const data = await fs.readFile(noticesFile, 'utf8');
    notices = JSON.parse(data);
  } catch (error) {
    console.error('Error loading notices:', error);
  }
}

// Function to save notices to file
async function saveNotices() {
  try {
    await fs.writeFile(noticesFile, JSON.stringify(notices, null, 2), 'utf8');
    console.log('Notices saved successfully.');
  } catch (error) {
    console.error('Error saving notices:', error);
  }
}

// Load notices initially when server starts
loadNotices();

// Route to handle incoming webhook from Mailgun
app.post('/webhooks/mailgun', (req, res) => {
  const emailData = req.body; // Assuming Mailgun sends JSON data
  
  // Process emailData and update notices accordingly
  console.log('Received email from Mailgun:', emailData);

  // Example: Extract subject and body
  const subject = emailData['subject'];
  const body = emailData['stripped-text'] || emailData['body-plain']; // Depending on how Mailgun formats the email body

  // Example: Update notices in memory
  notices.push({ subject, body });

  // Save notices to file after updating
  saveNotices();

  // Respond with a 200 OK to acknowledge receipt
  res.status(200).send('Received email from Mailgun');
});

// Route to fetch notices
app.get('/notices', (req, res) => {
  res.json(notices); // Return notices as JSON
});

// Serve static files (index.html and update-notices.js)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
