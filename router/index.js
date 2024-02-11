
const router = require('express').Router();

const HomeRoutes = require('../controller/bookcontroller');
const HomeRoutes = require('../controller/morrisroutes.js');

// Use the contacts routes
router.get('/', HomeRoutes.getMorris);

// Default route
router.get('/', nameRoutes.getHome);
router.get('/Books', BookRoutes.getAll);
router.get('/Books/:id', BookRoutes.getSingle);

// POST route to create a new Book
router.post('/Books', BookRoutes.createBooks);
 
// PUT route to update a Books
router.put('/Books/:id', BookRoutes.updateBooks);
 
// DELETE route to delete a Books
router.delete('/Books/:id', BookRoutes.deleteBooks);

module.exports = router;