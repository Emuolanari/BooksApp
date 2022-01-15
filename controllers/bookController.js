const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require(`./../utils/appError`);

exports.getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find({});
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    })
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new AppError(404, 'No book found with that id'));
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
});

exports.addBook = catchAsync(async (req, res, next) => {
    const newBook = await Book.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newBook
        }
    })

})

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new AppError(404, 'No book found with that id'));
    }
    res.status(204).json({
        status: 'success'
    })
    res.status
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!book) {
        return next(new AppError(404, 'No book found with that id'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})