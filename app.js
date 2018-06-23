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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.send("Please use /api/fortress-defenders");
});

//fetch types
app.get('/api/types', function(req, res){
  Types.getTypes(function(err, types){
    if(err){
      throw err;
    }
    res.json(types);
  })
});

//add a type
app.post('/api/types', function(req, res){
  let type = req.body;
  Types.addType(type, function(err, type){
    if(err){
      throw err;
    }
    res.json(type);
  })
});

//update type
app.put('/api/types/:id', function(req, res){
  let id = req.params.id
  let type = req.body;
  Types.updateType(id, type, {}, function(err, type){
    if(err){
      throw err;
    }
    res.json(type);
  })
});

//delete type
app.delete('/api/types/:id', function(req, res){
  let id = req.params.id
  Types.deleteType(id, function(err, type){
    if(err){
      throw err;
    }
    res.json(type);
  })
});

//fetch cards
app.get('/api/cards', function(req, res){
  Cards.getCards(function(err, cards){
    if(err){
      throw err;
    }
    res.json(cards);
  })
});

//fetch card by id
app.get('/api/cards/:id', function(req, res){
  Cards.getCardById(req.params.id, function(err, card){
    if(err){
      throw err;
    }
    res.json(card);
  })
});

//add a card
app.post('/api/cards', function(req, res){
  let cards = req.body;
  Cards.addCard(cards, function(err, card){
    if(err){
      throw err;
    }
    res.json(card);
  })
});

//update a card
app.put('/api/cards/:id', function(req, res){
  let id = req.params.id
  let card = req.body;
  Cards.updateCard(id, card, {}, function(err, card){
    if(err){
      throw err;
    }
    res.json(card);
  })
});

//delete a card
app.delete('/api/cards/:id', function(req, res){
  let id = req.params.id;
  Cards.deleteCard(id, function(err, card){
    if(err){
      throw err;
    }
    res.json(card);
  })
});

//listen for server
app.listen(port, function(req, res){
  console.log('Listening on port ' + port);
});



/* Card base
db.cards.insert({ name: "", type: "", passive: "", rank: "", req: "", hp: "", def: "", base_ap: "", image_url: "", skill_1: "", skill_2: "", skill_3: "" })
*/
