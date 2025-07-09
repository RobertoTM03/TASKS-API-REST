require('dotenv').config();
const express = require('express');
const authMiddleware = require("./interfaces/middlewares/authMiddleware");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando');
});

app.get('/test', authMiddleware, (req, res) => {
    res.status(200).json({
        email: req.user.email,
        password: req.user.password
    });
});

const authRoutes = require('./interfaces/routes/authRoutes');
app.use('/auth', authRoutes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));