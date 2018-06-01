const mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_data: {
    type: Date,
    default: Date.now
  },
});

let Cards = module.exports = mongoose.model('Cards', cardSchema);

// Get Cards
module.exports.getCards = function(callback, limit){
  Cards.find(callback).limit(limit);
}
