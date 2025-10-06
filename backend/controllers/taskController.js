const taskService = require('../services/taskService');

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await taskService.createTask(title, description, req.user.id);
        res.status(201).json(task);
    } catch (error) {
        if (error.message === 'Title is required') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Failed to create task' });
    }
};

const getRecentTasks = async (req, res) => {
    try {
        const tasks = await taskService.getRecentTasks(req.user.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
};

module.exports = {
    createTask,
    getRecentTasks,
};