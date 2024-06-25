const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

let notices = []; // Store notices in memory

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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
