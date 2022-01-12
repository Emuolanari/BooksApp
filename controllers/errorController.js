const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}
const sendDevErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendProdErrors = (err, res) => {
    if (err.isOperationsal) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            something: 'something went wrong'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendDevErrors(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (error.kind === "ObjectId") error = handleCastErrorDB(error);
        sendProdErrors(error, res);
    }

}