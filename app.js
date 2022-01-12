const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRouter');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/books', bookRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found or defined`, 404));
})

module.exports = app;