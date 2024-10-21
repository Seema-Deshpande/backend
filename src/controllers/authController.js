const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');
const User = require('../models/userModel');
// Mock User data
const users = [];
const blacklistedTokens = new Set(); // Simple in-memory blacklist

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user, userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  const token = req.body.token; // Assume the token is sent in the request body

  if (!token) {
    return res.status(400).json({ message: 'Token required' });
  }

  blacklistedTokens.add(token); // Add token to blacklist
  res.status(200).json({ message: 'Logged out successfully' });
};

// Middleware to check if token is blacklisted
const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

// Example of token validation middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  if (isTokenBlacklisted(token)) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { register, login, logout, authenticateToken };
