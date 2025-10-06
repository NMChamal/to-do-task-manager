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

const markTaskAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        await taskService.markTaskAsCompleted(id, req.user.id);
        res.status(200).json({ message: 'Task marked as completed' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to mark task as completed' });
    }
};

module.exports = {
    createTask,
    getRecentTasks,
    markTaskAsCompleted,
};