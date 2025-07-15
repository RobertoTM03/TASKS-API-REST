const TaskRepositoryImpl = require('../../infrastructure/db/TaskRepositoryImpl');

const CreateTask = require('../../application/use_cases/tasks/CreateTask');
const DeleteTask = require('../../application/use_cases/tasks/DeleteTask');
const GetTaskById = require('../../application/use_cases/tasks/GetTaskById');
const GetAllTasks = require('../../application/use_cases/tasks/GetAllUserTasks');
const UpdateTask = require('../../application/use_cases/tasks/UpdateTask');
const { TaskNotFoundError } = require("../../errors");

const taskRepository = new TaskRepositoryImpl();

const getTaskByIdUseCase = new GetTaskById(taskRepository);
const getAllTasksUseCase = new GetAllTasks(taskRepository);
const createTaskUseCase = new CreateTask(taskRepository);
const deleteTaskUseCase = new DeleteTask(taskRepository);
const updateTaskUseCase = new UpdateTask(taskRepository);

exports.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId || typeof taskId !== 'string' || !taskId.trim()) {
            return res.status(400).json({ error: 'Task ID is required in the path' });
        }

        const task = await getTaskByIdUseCase.execute({ taskId: taskId.trim() });
        res.json(task);
    } catch (err) {
        console.error(err);
        if (err.name === 'TaskNotFoundError') {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.getAllUserTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User authentication required' });
        }

        const ownerId = req.user.id;
        const tasks = await getAllTasksUseCase.execute({ ownerId });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User authentication required' });
        }

        const ownerId = req.user.id;
        const { description } = req.body;

        if (!description || typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({ error: 'Description is required in the request body' });
        }

        const task = await createTaskUseCase.execute({ taskText: description.trim(), ownerId });
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId || typeof taskId !== 'string' || !taskId.trim()) {
            return res.status(400).json({ error: 'Task ID is required in the path' });
        }

        await deleteTaskUseCase.execute({ taskId: taskId.trim() });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.name === 'TaskNotFoundError') {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { description } = req.body;

        if (!taskId || typeof taskId !== 'string' || !taskId.trim()) {
            return res.status(400).json({ error: 'Task ID is required in the path' });
        }

        if (!description || typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({ error: 'Description is required in the request body' });
        }

        const updatedTask = await updateTaskUseCase.execute({
            taskId: taskId.trim(),
            taskText: description.trim()
        });

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        if (err.name === 'TaskNotFoundError') {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};
