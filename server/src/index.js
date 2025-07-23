require('dotenv').config();
const express = require('express');
const app = express();
const authMiddleware = require("./interfaces/middlewares/authMiddleware");

// Api documentation with swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de mi API con Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.API_PORT || 3000}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/interfaces/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API declaration
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API working');
});

const authRoutes = require('./interfaces/routes/authRoutes');
app.use('/auth', authRoutes);

const taskRoutes = require('./interfaces/routes/taskRoutes');
app.use('/tasks', authMiddleware, taskRoutes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
