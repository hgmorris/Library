const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

// Initialize Express application
const app = express();

// MongoDB initialization script
const { initDb } = require('./mongodb/mongodb.js');

// Middleware to parse JSON bodies. This fixes issues where req.body might be undefined.
app.use(express.json());

// CORS Middleware for handling cross-origin requests
app.use(cors());

// Router setup
const router = require('./router/index.js');
app.use('/', router);

// Swagger UI setup for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server port configuration
const port = process.env.PORT || 8080;

// Initialize MongoDB and start the server upon successful database connection
initDb((err) => {
    if (err) {
        console.error('Error initializing MongoDB:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
