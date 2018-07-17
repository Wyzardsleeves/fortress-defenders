const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
  name:{
    type: String,
    required: false
  },
  type:{
    type: String,
    required: false
  },
  faction:{
    type: String,
    required: false
  },
  color:{
    type: String,
    required: false
  },
  passive:{
    type: String,
    required: false
  },
  rank:{
    type: String,
    required: false
  },
  req:{
    type: String,
    required: false
  },
  hp:{
    type: String,
    required: false
  },
  def:{
    type: String,
    required: false
  },
  base_ap:{
    type: String,
    required: false
  },
  image_url:{
    type: String,
    required: false
  },
  skill_1:{
    type: String,
    required: false
  },
  skill_2:{
    type: String,
    required: false
  },
  skill_3:{
    type: String,
    required: false
  },
  create_data: {
    type: Date,
    default: Date.now
  }
});

let Cards = module.exports = mongoose.model('Cards', cardSchema);

// Get Cards
module.exports.getCards = function(callback, limit){
  Cards.find(callback).limit(limit);
}

//get book by id
module.exports.getCardById = function(id, callback){
  Cards.findById(id, callback);
}

module.exports.addCard = function(card, callback){
  Cards.create(card, callback);
}

module.exports.updateCard = function(id, card, options, callback){
  let query = {_id: id};
  let update = {
    name: card.name,
    type: card.type,
    faction: card.faction,
    color: card.color,
    passive: card.passive,
    rank: card.rank,
    req: card.req,
    hp: card.hp,
    def: card.def,
    base_ap: card.base_ap,
    image_url: card.image_url,
    skill_1: card.skill_1,
    skill_2: card.skill_2,
    skill_3: card.skill_3
  }
  Cards.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteCard = function(id, callback){
  let query = {_id: id};
  Cards.remove(query, callback);
}
