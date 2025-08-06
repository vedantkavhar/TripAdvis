const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail, activateUser } = require('../models/User');
const { generateToken, verifyToken } = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //if user exists
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with inactive status
    const user = await createUser(name, email, hashedPassword, 'Self', new Date(), 0);

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



const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = verifyToken(token);
    // 1. Check if user exists with this email
    const user = await getUserByEmail(decoded.email);
    if (!user) return res.status(400).send('Invalid verification link');
    
    // 2. Check if user is already active
    if (user.IsActive) return res.status(400).send('Email already verified');
    
    // 3. Now activate the user
    await activateUser(decoded.email);
    await activateUser(decoded.email);// Decodes JWT to get email

    // res.status(200).send('Email verified successfully. You can now login.');

    res.status(200).send(`
  <html>
    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h2 style="color: green;"> Email Verified Successfully!</h2>
      <p>Your account has been activated.</p>
      <a href="http://localhost:3000/login" 
         style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Login Now
      </a>
    </body>
  </html>
`);
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
};


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
