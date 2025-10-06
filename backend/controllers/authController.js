const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);
        res.status(201).json(user);
    } catch (error) {
        if (error.message === 'Username and password are required' || error.message === 'Username already exists') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        if (error.message === 'Username and password are required' || error.message === 'Invalid credentials') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
};