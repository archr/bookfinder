//
// Dependencias
//

var express = require('express');
var mongoose = require('mongoose');

var app = new express.Router;
module.exports.app = app;

//
// Modelos
//

book = mongoose.model('Book');

app.use("*", function (req, res, next){
  res.locals.appName = 'Book Finder App';

  next();
});

app.param('idBook', function (req, res, next, idBook){
  book.findOne({_id: req.params.idBook}, function (err, _book){
    if (err || !_book) {
      return res.redirect('/app');
    }

    req.book = _book;
    next();
  });
});

app.route("/")
.get(function (req, res) {
  book.find({}, function (err, books){
    if (err) {
      return res.send(500);
    }

    res.render('app', {
      books: books
    });
  });
});

app.route('/add')
.get(function (req, res){
  res.render('add-book');
})
.post(function (req, res){
  var newBook = new book(req.body);
  newBook.save(function (err){
    res.redirect("/app");
  });
});


app.route('/delete/:idBook')
.get(function (req, res){
  req.book.remove(function (err){
    return res.redirect('/app');
  });
});


app.route('/edit/:idBook')
.get(function (req, res){
  res.render('edit-book', {
    book: req.book
  });
})
.post(function (req, res){
  if (req.body.name && req.body.name !== req.book.name) {
    req.book.name =  req.body.name;
  }

  if (req.body.authorName !== req.book.authorName) {
    req.book.authorName = req.body.authorName;
  }

  req.book.save(function (err){
    res.redirect('/app');
  });
});