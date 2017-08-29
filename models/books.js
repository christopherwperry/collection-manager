const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    pages: Number,
    year: Number,
    editions: [{
        year: { type: Number, required: true},
        publisher: { type: String},
        location: { type: String, required: true }
    }],
    author: {type: String, required: true},
    genre: {type: String}
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
