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

app.get('/', function(req, res){
  Book.find({}).then(function (books){
    res.render('index', {books: books})
  })
})

app.get('/new/', function(req, res){
  res.render('new')
})

app.get('/:title', function(req, res){
  Book.findOne({title: req.params.title}).then(function(book){
    res.render('book', {books: books})
  })
})

app.get('/:title/new_edition', function(req, res){
  Book.findOne({title: req.params.title})
  .then(function(book){
    book.edition.push(req.body)
    return book.save()
    res.render('new_edition', {book: book})
  })
})

app.post('/new', function(req, res){
  Book.create(req.body).then(function (book){
    res.redirect('/');
  })
  .catch(function (error){
  //   let errorMsg
  //   if (error.code === possible error){
  //   enter error message
  //   errorMsg = `The recipe name "${req.body.name}" has already been used`
  // } else {
  //   enter error message
  //   errorMsg = "You have encountered an error!"
  // }
    res.send(error)
  })
})

app.listen(port, function(){
  console.log("The server is running on port 3000")
});
