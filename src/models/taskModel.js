// models/task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' } // Reference to User
});

module.exports = mongoose.model('Task', TaskSchema);
