const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/books', bookRouter);

module.exports = app;