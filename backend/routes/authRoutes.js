const express = require('express');
const router = express.Router();
const { register, verify, login } = require('../controllers/authController');

// Full explicit paths
router.post('/api/auth/register', register);
router.get('/api/auth/verify', verify);
router.post('/api/auth/login', login);

module.exports = router;
