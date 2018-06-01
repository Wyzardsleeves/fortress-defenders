const express = require('express');
const app = express();
const bodyParser = require('body-parser');  //include body parser
const mongoose = require('mongoose');       //include mongoose
const port = 5000;  //set a port

Types = require('./models/types.js');  //include type.js
Cards = require('./models/cards.js');  //include cards.js

//connect to mongoose
mongoose.connect('mongodb://localhost/fortressDefenders');
var db = mongoose.connection;

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  res.send("Please use /api/fortress-defenders");
});

app.get('/api/fortress-defenders', function(req, res){
  Cards.getCards(function(err, cards){
    if(err){
      throw err;
    }
    res.json(cards);
  })
});

app.get('/api/fortress-defenders/types', function(req, res){
  Types.getTypes(function(err, types){
    if(err){
      throw err;
    }
    res.json(types);
  })
});

app.listen(port, function(req, res){
  console.log('Listening on port ' + port);
});

/* Card base
db.cards.insert({ name: "", type: "", passive: "", rank: "", req: "", hp: "", def: "", base_ap: "", image_url: "", skill_1: "", skill_2: "", skill_3: "" })
*/
