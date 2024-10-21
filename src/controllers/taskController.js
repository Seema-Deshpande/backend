const Task = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

// Function to get all tasks for a specific user
async function getAllTask(req, res) {
  try {
    const userId = req.query.userId; // Assuming user ID is attached to req.user after authentication
    const tasks = await Task.find({ userId }); // Fetch tasks for the specific user
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to get a specific task
async function getTask(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId, userId: req.params.userId }); // Ensure task belongs to user

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to create a new task
async function createTask(req, res) {
  const { title, description, dueDate, status, userId } = req.body;

  const task = new Task({
    id: uuidv4(),
    title,
    description,
    dueDate,
    status,
    userId // Assign user ID to the task
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to update a task
async function updateTask(req, res) {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.params.userId}); // Ensure task belongs to user
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to delete a task
async function deleteTask(req, res) {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, userId: req.params.userId }); // Ensure task belongs to user
    if (result.deletedCount > 0) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
