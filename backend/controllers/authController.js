const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail, activateUser } = require('../models/User');
const { generateToken, verifyToken } = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');

// 1. Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with inactive status
    const user = await createUser(name, email, hashedPassword, 'Self', new Date(), 0);

    // Generate verification token
    const token = generateToken({ email });

    const verificationLink = `http://localhost:5000/api/auth/verify?token=${token}`;

    // Send verification email
    await sendEmail(email, 'Verify your email - TripAdvis', `
      <h2>Welcome to TripAdvis!</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `);

    res.status(201).json({ message: 'User registered. Check email to verify.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// 2. Verify Email
const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = verifyToken(token);

    await activateUser(decoded.email);

    res.status(200).send('Email verified successfully. You can now login.');
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
};

// 3. Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.IsActive) return res.status(401).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.UserId, email: user.Email });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, verify, login };
