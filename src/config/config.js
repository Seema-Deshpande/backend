require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  MONGO_URI:process.env.MONGO_URI,
};
