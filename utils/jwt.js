const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const signToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

module.exports = {
  signToken,
};
