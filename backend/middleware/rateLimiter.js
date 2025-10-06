const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    message: 'Too many requests from this IP, please try again after a minute'
});

const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
    message: 'Too many requests from this IP, please try again after a minute'
});

module.exports = {
    authLimiter,
    generalLimiter
};