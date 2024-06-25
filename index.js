const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Example route
app.post('/receive-email', (req, res) => {
  const emailContent = req.body; // Assuming email content is JSON
  console.log('Received email:', emailContent);
  res.status(200).send('Email received and processed successfully');
});
app.post('/webhooks/mailgun', (req, res) => {
    const emailData = req.body; // Assuming Mailgun sends JSON data
    
    // Process emailData and update notices accordingly
    console.log('Received email from Mailgun:', emailData);
  
    // Respond with a 200 OK to acknowledge receipt
    res.status(200).send('Received email from Mailgun');
  });

// Serve static files (if you have any)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
