const express = require('express');
const app = express();
const bodyParser = require('body-parser');  //include body parser
const mongoose = require('mongoose');       //include mongoose
const port = 5000;  //set a port

//connect to mongoose
mongoose.connect('mongodb://localhost/fortressdefenders');
var db = mongoose.connection;

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  res.send("Please use /api/fortress-defenders");
});

app.get('/api/fortress-defenders', function(req, res){
  res.send("API");
});

app.listen(port, function(req, res){
  console.log('Listening on port ' + port);
});
