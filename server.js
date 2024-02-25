const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');


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


// auth login
router.get('/login', (req, res) => {
    res.send('Logging in...');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

