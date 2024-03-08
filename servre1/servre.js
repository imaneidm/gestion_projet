// Node.js backend (server.js)
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
const port = 3010
;

// Sample user data (replace with data fetched from your database)
const users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
  // Add more user data as needed
];

// Route handler for GET requests to "/users"
app.get('/users', (req, res) => {
  // Send the list of users as a JSON response
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define route handler for POST requests to /send-email
app.post('/send-email', async (req, res) => {
  const { email, name } = req.body;

  // Logic to send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'imaneidm904@gmail.com',
      pass: 'Qdsg5124'
    }
  });

  const mailOptions = {
    from: 'imaneidm904@gmail.com',
    to: email,
    subject: 'Welcome to Our Website',
    text: `Hi ${name}, YOU'RE IN THE TEAM NOW!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    // Logic to insert user into database
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
