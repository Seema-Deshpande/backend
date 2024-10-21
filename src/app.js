const express = require('express');
const authRoutes = require('./routes/authRouter');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const { MONGO_URI } = require('./config/config');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
