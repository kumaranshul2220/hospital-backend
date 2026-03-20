const { verifyToken } = require('../helpers/authHelper');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const payload = verifyToken(token);
    if (!payload) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = payload;
    next();
};

module.exports = authenticate;
