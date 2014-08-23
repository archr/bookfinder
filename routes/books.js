var express = require('express');
var mongoose = require('mongoose');

var books = new express.Router;
// Se expone el router books
module.exports.books = books;

var book = mongoose.model("Book");

// Atendera todas las peticiones a localhost:3000/books
books.route("/")
.get(function (req, res){
  book.find({}, function (err, _books){
    res.json(_books);
  });
})
.post(function (req, res){
  var data = req.body;
  book.create(data, function(err, _book){
    if(err){
      return res.status(500).end(err.message);
    }

    res.json(_book);
  })
});

// Atendera todas las peticiones a localhost:3000/books/:bookId
books.get("/:bookId", function (req, res){
  var bookId = req.params.bookId;
  // Se busca libro en la base de datos
  book.findOne({_id: bookId}, function (err, _book){
    res.json(_book);
  })
});