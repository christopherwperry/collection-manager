const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const Book = require('./models/books')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
mongoose.connect('mongodb://localhost:27017/newdb', {useMongoClient: true});
mongoose.Promise = require('bluebird');

app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.get('/new', function(req, res){
  res.render('new');
})

app.post('/new', function(req, res){
  Book.create(req.body).then(function(book){
     res.redirect('/');
   })
})

const getBook = function(req, res, next) {
    Book.findOne({title: req.params.title}).then(function(book) {
        req.book = book;
        next();
    })
};

app.get('/:title', getBook, function(req, res){
    const book = req.book;
    res.render('book', {book: book})
  });

app.get('/:title/edit', getBook, function (req, res){
    const book = req.book;
    res.render('edit', {book: book})
  })

app.post('/:title/edit', getBook, function (req, res){
    const book = req.book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.pages = req.body.pages;
    book.year = req.body.year;
    book.isbn = req.body.isbn;
    book.language = req.body.language;
    const error = book.validateSync();
    if (!error) {
      book.save();
      res.redirect(`/${book.title}`)
    } else {
      console.log(error);
      res.render('edit', {book: book, errors: error.errors})
    }
})

app.get('/:title/new_edition', function(req, res){
  Book.findOne({title: req.params.title})
  .then(function(book){
    res.render('new_edition', {book: book})
  })
})


app.post('/:title/delete', function (req, res) {
  Book.deleteOne({title: req.params.title}).then(function(book){
    res.redirect('/');
  })
})

app.get('/', function(req, res){
  Book.find().then(function (book){
    res.render('index', {book: book})
  })
})

app.listen(port, function(){
 console.log("The server is running on port 3000")
});
