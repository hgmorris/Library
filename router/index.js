
const router = require('express').Router();

const BookRoutes = require('../controller/bookcontroller.js');
const HomeRoutes = require('../controller/morrisroutes.js');
const FilmsRoutes = require('../controller/film.js');
const auth = require('express-openid-connect');
const {requiresAuth} = require('express-openid-connect');


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

router.get('/films', FilmsRoutes.retrieveFilms);
router.get('/films/:id', FilmsRoutes.retrieveOneFilm);
router.post('/films', FilmsRoutes.createFilm);
router.put('/films/:id', FilmsRoutes.updateFilm);
router.delete('/films/:id', FilmsRoutes.deletefilm);


module.exports = router;