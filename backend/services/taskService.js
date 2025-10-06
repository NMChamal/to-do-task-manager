const taskRepository = require('../repositories/taskRepository');

const createTask = async (title, description, userId) => {
    if (!title) {
        throw new Error('Title is required');
    }
    const result = await taskRepository.create(title, description, userId);
    return { id: result.id, title, description };
};

const getRecentTasks = async (userId) => {
    return await taskRepository.findRecentByUser(userId);
};

const markTaskAsCompleted = async (id, userId) => {
    return await taskRepository.markAsCompleted(id, userId);
};

module.exports = {
    createTask,
    getRecentTasks,
    markTaskAsCompleted,
};
