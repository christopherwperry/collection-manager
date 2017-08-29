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

const DUPLICATE_RECORD_ERROR = 11000;

app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.get('/new', function(req, res){
  res.render('new');
})

app.post('/new', function(req, res){
  Book.create(req.body).then(function(book){
     res.redirect('/');
   })
})

app.get('/', function(req, res){
  Book.find().then(function (books){
    res.render('index', {books: books})
  })
})

app.listen(port, function(){
 console.log("The server is running on port 3000")
});

// app.get('/:title/new_edition', function(req, res){
//   Book.findOne({title: req.params.title})
//   .then(function(book){
//     book.edition.push(req.body);
//     book.save();
//     res.render('new_edition', {book: book})
//   })
// })

  //  .catch(function (error) {
  //    let errorMsg;
  //    if (error.code ===
  //      DUPLICATE_RECORD_ERROR) {
  //        errorMsg = `The Title "${req.body.title}" has already been used.`
  //      } else {
  //        errorMsg = "You have encountered an unknown error."
  //   }
  //   res.render('new', {errorMsg: errorMsg});
  // })

// app.get('/:title', function(req, res){
//     Book.findOne({title: req.params.title}).then(function(book){
//       res.render('book', {book: book})
//     })
//   })
