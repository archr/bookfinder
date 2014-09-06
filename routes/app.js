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
});