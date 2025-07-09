const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

module.exports = {
    sign(payload) {
        return jwt.sign(payload, SECRET, { expiresIn: '1h' });
    },

    verify(token) {
        return jwt.verify(token, SECRET);
    }
};
