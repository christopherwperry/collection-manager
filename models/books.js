const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: {type: String, required: true},
    genre: {type: String},
    pages: Number,
    year: Number,
    editions: [{
        year: { type: Number, required: true},
        publisher: { type: String},
        location: { type: String, required: true }
    }]
})

const Book = mongoose.model('Book', bookSchema);

var book = new Book();

book.save();

module.exports = Book;
