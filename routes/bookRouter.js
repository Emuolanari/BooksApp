const express = require('express');
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, bookController.getAllBooks)
    .post(bookController.addBook);


router.route('/:id')
    .get(bookController.getBook)
    .delete(bookController.deleteBook)
    .patch(bookController.updateBook)


module.exports = router;