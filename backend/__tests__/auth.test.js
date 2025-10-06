const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const authController = require('../controllers/authController');
const authService = require('../services/authService');
const db = require('../database');

// Mock the authService
jest.mock('../services/authService', () => ({
    register: jest.fn(),
    login: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  afterAll(() => {
    db.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      authService.register.mockResolvedValue({ id: 1, username: 'testuser' });

      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'password'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('username', 'testuser');
    });

    it('should return 400 if username is not provided', async () => {
        authService.register.mockImplementation(() => {
            throw new Error('Username and password are required');
        });

        const res = await request(app)
            .post('/auth/register')
            .send({
                password: 'password'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Username and password are required');
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user and return a token', async () => {
      authService.login.mockResolvedValue('fake-token');

      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'testuser',
          password: 'password'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token', 'fake-token');
    });

    it('should return 401 for invalid credentials', async () => {
        authService.login.mockImplementation(() => {
            throw new Error('Invalid credentials');
        });

        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});
