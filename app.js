require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS, {});

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
