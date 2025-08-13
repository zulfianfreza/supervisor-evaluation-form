const httpStatus = require('http-status');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const express = require('express');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes');
const ApiError = require('./common/helpers/ApiError');
const { errorConverter, errorHandler } = require('./middleware/error.middleware');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
// app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/public', express.static(path.join(__dirname, 'storage/temp')));

app.use('/api', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle errors
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
