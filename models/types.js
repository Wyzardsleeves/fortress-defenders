const mongoose = require('mongoose');

let typesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_data: {
    type: Date,
    default: Date.now
  }
});

let Types = module.exports = mongoose.model('Types', typesSchema);

// Get Type
module.exports.getTypes = function(callback, limit){
  Types.find(callback).limit(limit);
};

// Post
module.exports.addType = function(type, callback){
  Types.create(type, callback);
};

// Put
module.exports.updateType = function(id, type, options, callback){
  let query = {_id: id};
  let update = {
    name: type.name
  }
  Types.findOneAndUpdate(query, update, options, callback);
};

// Delete
module.exports.deleteType = function(id, callback){
  let query = {_id: id};
  Types.remove(query, callback);
}
