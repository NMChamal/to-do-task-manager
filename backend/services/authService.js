const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.create(username, hashedPassword);
};

const login = async (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    const user = await userRepository.findByUsername(username);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    register,
    login,
};
