const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const Book = require('./models/books')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb', {useMongoClient: true});
mongoose.Promise = require('bluebird');

app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res){
//  const books = db.collection('books');
  Book.find({}).then(function (books){
    res.render('index', {books})
  })
})

app.get('/new', function(req, res){
  res.render('new')
})

app.post('/new', function(req, res){
  const books = db.collection('books');
  books.insert({"title": req.body.title, "author": req.body.author, "genre": req.body.genre, "pages": req.body.pages, "year": req.body.year});
  res.redirect('/');
})

app.listen(port, function(){
  console.log("The server is running on port 3000")
});
