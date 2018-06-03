const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  passive:{
    type: String,
    required: false
  },
  rank:{
    type: String,
    required: true
  },
  req:{
    type: String,
    required: true
  },
  hp:{
    type: String,
    required: true
  },
  def:{
    type: String,
    required: true
  },
  base_ap:{
    type: String,
    required: true
  },
  image_url:{
    type: String,
    required: false
  },
  skill_1:{
    type: String,
    required: true
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
