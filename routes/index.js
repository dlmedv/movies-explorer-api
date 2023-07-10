const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const NotFound = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validations');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => next(new NotFound('По этому адресу ничего нет')));

module.exports = router;
