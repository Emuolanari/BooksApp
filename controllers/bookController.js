const Book = require('./../models/bookModel');

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

exports.addBook = async (req, res, next) => {
    const newBook = await Book.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newBook
        }
    })
}