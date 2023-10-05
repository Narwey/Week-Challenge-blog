const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = [
    {
        id : 1,
        email : "Anouar@gmail.com",
        password: 'password1237',
        name : "Anouar",
    },
    {
        id : 2,
        email : "Harry@gmail.com",
        password: 'password1236',
        name : "Harry",
    },
    {
        id : 3,
        email : "Ron@gmail.com",
        password: 'password1235',
        name : "Ron",
    },
    {
        id : 4,
        email : "Ber9el@gmail.com",
        password: 'password1234',
        name : "Ber9el",
    }
];

// User registration route (GET)
router.get('/register', (req, res) => {
  res.render('register'); // Render the 'register' view for user registration
});

// User registration route (POST)
router.post('/register', async (req, res) => {
  try {
    // Get user input from the registration form
    const { email, password } = req.body;

    // Check if the email is already registered (you should validate email uniqueness)
    const isEmailTaken = users.some((user) => user.email === email);
    if (isEmailTaken) {
      return res.render('register', { error: 'Email is already registered' });
    }

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of hashing rounds

    // Create a new user object with the hashed password
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
    };

    // Add the new user to the users array (for simplicity, we're using an array)
    users.push(newUser);

    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login route (GET)
router.get('/login', (req, res) => {
  res.render('login'); // Render the 'login' view for user login
});

// User login route (POST)
router.post('/login', async (req, res) => {
  try {
    // Get user input from the login form
    const { email, password } = req.body;

    // Find the user by email (you should retrieve the user from a database)
    const user = users.find((user) => user.email === email);

    // Check if the user exists and the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // At this point, the user is successfully authenticated
    // In a real application, you would typically use JWT or sessions to manage the authenticated state
    req.query = {};

    // Redirect to a user profile page or dashboard after successful login
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
