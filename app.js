require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/requestsLimiter');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();
app.use(cors());
mongoose.connect(DB_ADDRESS, {});

app.use(limiter);
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
