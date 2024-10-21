const express = require('express');
const { register, login, logout} = require('../controllers/authController');
const { getProfile,updateProfile } = require('../controllers/profileController');
const { createTask, getAllTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);

router.post('/task', createTask);
router.get('/task',getAllTask)
router.get('/task/:id/:userId', getTask);
router.put('/task/:id/:userId', updateTask);
router.delete('/task/:id/:userId', deleteTask)


module.exports = router;
