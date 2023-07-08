const router = require('express').Router();
const movieControllers = require('../controllers/movies');
const { validateCreateMovie } = require('../middlewares/validations');

router.get('/', movieControllers.getAllMovies);
router.post('/', validateCreateMovie, movieControllers.createMovie);
router.delete('/:movieId', movieControllers.deleteMovie);

module.exports = router;
