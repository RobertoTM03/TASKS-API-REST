const jwtService = require('../../infrastructure/auth/jwtService');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Invalid authorization header format. Expected: Bearer <token>' });
        }

        const token = parts[1];
        req.user = jwtService.verify(token);



        next();
    } catch (err) {
        console.error('Auth error:', err.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
