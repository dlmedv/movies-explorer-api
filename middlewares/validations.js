const { celebrate, Joi } = require('celebrate');

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i),
    trailerLink: Joi.string().pattern(/^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i),
    thumbnail: Joi.string().pattern(/^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateSignIn,
  validateSignUp,
  validateUpdateUser,
  validateCreateMovie,
};
