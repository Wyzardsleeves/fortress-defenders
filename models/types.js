const mongoose = require('mongoose');

let typesSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_data: {
    type: Date,
    default: Date.now
  }
});

let Types = module.exports = mongoose.model('Type', typesSchema);

// Get Type
module.exports.getTypes = function(callback, limit){
  Types.find(callback).limit(limit);
}
