const router = require('express').Router();
const userControllers = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validations');

router.get('/me', userControllers.getUserById);
router.patch('/me', validateUpdateUser, userControllers.updateUser);

module.exports = router;
