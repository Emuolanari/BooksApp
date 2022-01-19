const express = require('express');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;