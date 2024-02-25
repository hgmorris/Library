
const router = require('express').Router();

const BookRoutes = require('../controller/bookcontroller.js');
const HomeRoutes = require('../controller/morrisroutes.js');

// Use the contacts routes
router.get('/', HomeRoutes.getHome);

// Default route
router.get('/Books', BookRoutes.retrieveBooks);
router.get('/Books/:id', BookRoutes.retrieveOneBook);

// POST route to create a new Book
router.post('/Books', BookRoutes.createBook);
 
// PUT route to update a Books
router.put('/Books/:id', BookRoutes.updateBook);
 
// DELETE route to delete a Books
router.delete('/Books/:id', BookRoutes.deleteBook);

module.exports = router;