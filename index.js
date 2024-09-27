require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const sequelize = require('./config/db.config');
const Note = require('./model/note');
const noteRoutes = require('./route/noteroute')
const authRoutes = require('./route/authroute')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'API documentation for your backend',
        },
        servers: [
            {
                url: `${process.env.SERVER_URL}:${process.env.PORT}`, // Your server URL
            },
        ],
    },
    apis: ['./route/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 
sequelize.sync().then(() => {
    console.log("Database & tables created!");
});

app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/api', authRoutes)
app.use('/api', noteRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});