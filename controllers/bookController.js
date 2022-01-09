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

exports.getBook = async (req, res, next) => {
    //console.log(req.params);
    const book = await Book.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })

    //remember to handle errors
}

exports.addBook = async (req, res, next) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newBook
            }
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
}

exports.deleteBook = async (req, res, next) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'successs',
    })
}

exports.updateBook = async (req, res, next) => {
    const book = Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    //remember to handle errors
}