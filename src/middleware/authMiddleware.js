const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
