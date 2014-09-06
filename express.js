//
// Dependencias
//

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

//
// Se inicializa la aplicación
//

var app = express();

//
// Conexión a la base de datos
//

mongoose.connect('mongodb://localhost/book-dev');

//
// Se cargan los modelos dinamicamente
//

fs.readdirSync("./models").forEach(function (model){
  require("./models/" + model);
});


//
// Se configura la aplicación
//

app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('views', "./views");
app.set('view engine', 'jade');

//
// Middleware - logger
//

app.use(function (req, res, next){
  console.log(req.method + " " + req.url);
  next();
});

//
// Se configuran las rutas
//
app.use("/books", require('./routes/books').books);
app.use("/app", require('./routes/app').app);

// Peticion a localhost:3000/
app.get("/", function (req, res){
  res.send("string");
});

// Peticion a localhost:3000/foo
app.get("/foo", function (req, res){
  res.send("foo");
});

// Peticion a localhost:3000/json
app.get("/json", function (req, res){
  res.json({
    success: 'true',
    message: 'Ok'
  })
});

app.listen(3000, function (){
  console.log("aplicación iniciada");
});