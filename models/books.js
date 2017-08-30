const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String},
    pages: Number,
    year: Number,
    isbn: Number,
    language: {type: String},
    editions: [{
        year: { type: Number},
        publisher: { type: String},
        location: { type: String}
    }]
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
