const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
const {auth, requiresAuth} = require('express-openid-connect');
require('dotenv').config();


const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,

};

// auth router attaches /login, /logout, and /callback routes to the baseURL



// Initialize Express application
const app = express();

// MongoDB initialization script
const { initDb } = require('./mongodb/mongodb.js');

// Middleware to parse JSON bodies. This fixes issues where req.body might be undefined.
app.use(express.json());

// CORS Middleware for handling cross-origin requests
app.use(cors());


app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// Swagger UI setup for API documentation
app
.use('/', requiresAuth(), require('./router/index.js'))
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

