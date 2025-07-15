    require('dotenv').config();
    const express = require('express');
    const authMiddleware = require("./interfaces/middlewares/authMiddleware");

    const app = express();

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('API working');
    });

    const authRoutes = require('./interfaces/routes/authRoutes');
    app.use('/auth', authRoutes);

    const taskRoutes = require('./interfaces/routes/taskRoutes');
    app.use('/tasks', authMiddleware, taskRoutes);

    const PORT = process.env.API_PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));