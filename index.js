const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

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

  // Example: Update notices or store email content as needed

  // Respond with a 200 OK to acknowledge receipt
  res.status(200).send('Received email from Mailgun');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
