const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllBooks = async (req, res, next) => {
    const books = await Book.find({});
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    })
}

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
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
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success'
    })
    res.status
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})