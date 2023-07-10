const movieSchema = require('../models/movie');
const BadRequest = require('../errors/Conflict');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

const getAllMovies = (req, res, next) => {
  movieSchema.find({ owner: req.user._id })
    .then((movie) => res.send(movie.reverse()))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  movieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieSchema.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Такого фильма не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не можете удалить чужой фильм');
      }
      movieSchema.deleteOne()
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные удаления'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
