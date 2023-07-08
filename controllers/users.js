const bcrypt = require('bcryptjs');
const userSchema = require('../models/user');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');

const jwtAuth = require('../utils/jwt');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      userSchema.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequest('Переданы некорректные данные'));
          } else if (err.code === 11000) {
            return next(new Conflict('Пользователь с таким Email уже существует'));
          }
          return next(new Error(err.message));
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userSchema.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Почта или пароль введены неверно');
      }
      return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(([user, matched]) => {
      if (!matched) {
        throw new Unauthorized('Почта или пароль введены неверно');
      }

      const token = jwtAuth.signToken({ _id: user._id });

      return res.status(200).send({ token });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  userSchema.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для получения данных пользователя'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(new Error(err.message));
    });
};

module.exports = {
  createUser,
  login,
  getUserById,
  updateUser,
};
