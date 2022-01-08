const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'book title is required']
    },
    genre: String,
    description: {
        type: String,
        required: [true, 'Book description is required']
    },
    author: {
        type: String,
        required: [true, 'authors\'s name is required']
    }
})

const Book = mongoose.model(Book, bookSchema);

module.exports = Book;