const express = require('express');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;