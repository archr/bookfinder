var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  authorName: String,
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Book", bookSchema);