const jwt = require('jsonwebtoken');
const config = require('../config/index');

const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        config.jwtSecret,
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
