const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');
const taskController = require('../controllers/taskController');
const taskService = require('../services/taskService');
const authMiddleware = require('../middleware/authMiddleware');

// Mock the taskService
jest.mock('../services/taskService');
// Mock the authMiddleware
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { id: 1 };
  next();
});

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

describe('Task Routes', () => {
  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      taskService.createTask.mockResolvedValue({ id: 1, title: 'Test Task', description: 'Test Description' });

      const res = await request(app)
        .post('/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('title', 'Test Task');
    });
  });

  describe('GET /tasks', () => {
    it('should get recent tasks', async () => {
      taskService.getRecentTasks.mockResolvedValue([{ id: 1, title: 'Test Task', description: 'Test Description' }]);

      const res = await request(app).get('/tasks');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty('title', 'Test Task');
    });
  });

  describe('PATCH /tasks/:id/complete', () => {
    it('should mark a task as completed', async () => {
      taskService.markTaskAsCompleted.mockResolvedValue({ changes: 1 });

      const res = await request(app).patch('/tasks/1/complete');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Task marked as completed');
    });
  });
});
