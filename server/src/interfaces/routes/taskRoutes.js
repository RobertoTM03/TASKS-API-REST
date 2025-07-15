const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllUserTasks)
router.get('/:taskId', taskController.getTaskById)
router.put('/:taskId', taskController.updateTask)
router.delete('/:taskId', taskController.deleteTask)
router.post('/', taskController.createTask)

module.exports = router;
