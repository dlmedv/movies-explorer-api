const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите в формате URL',
      },
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите в формате URL',
      },
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите в формате URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
