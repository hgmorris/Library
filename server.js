const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
var cors = require('cors')


// Import the express module
const express = require('express');


// Create an instance of the Express application
const app = express();

const { initDb } = require('./mongodb/mongodb.js');
app.use(cors())
// Create an instance of the Express Router
const router = require('./router/index.js');
// Add support for CORS

app.use('/', router);

// Set the port for the server. If the environment variable 'Port' is not set, default to port 3000
const port = process.env.PORT || 8080;

initDb((err) => {
    if (err) {
        console.error('Error initializing MongoDB:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));