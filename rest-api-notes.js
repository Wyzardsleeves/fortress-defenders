//Notes for a rest-api


//connect to mongoose
mongoose.connect('mongodb://localhost/fortressDefenders');
var db = mongoose.connection;

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//get request for homepage
app.get('/', function(req, res){
  res.send('Send to root html page');
});

//setup listener
app.listen(portNumberHere, function(req, res){
  console.log('Port running on ' + portNumberHere);
});

//mongodb
find directory and right click "open bash here"
initiate mongo          // "./mongo" instead of just "mongo"
create a database       // use databaseNameHere
display collections     // show collections
create a collection     //db.createCollection('collectionName')
add to collection       //db.collectionName(paramName: 'paramValue')
rename a collection     //db.example.renameCollection("example")
find all of objects in collection   //db.collectionName.find()
find all and make pretty            //db.collectionName.find().pretty()

//create a route for api end
create models dir
create models/modelName.js
include mongoose in modelName.js  //const mongoose = require('mongoose');

app.get('api/endName', function(req, res){  //in app.js

});

//Schema in modelName.js
let modelNameSchema = mongoose.Schema ({ //format for schema
  name: {
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

let ModelName = module.exports = moongoose.model('ModelName', modelNameSchema); //make accessable outside of model.js

// Get Type

module.exports.getModelName = function(callback, limit){
  ModelName.find(callback).limit(limit);
}

//in app.js
ModelName = require('./models/modelName.js'); //includes Model

//fetch single object
module.exports.getModelNameById = function(id, callback){
  ModelName.findById(id, callback);  //mongoose method that finds by id
}

//in app.js (may or nay not need the _ in front of id)
app.get('/api/cards/:_id', function(req, res){ //calls for the id
  Cards.getCardById(req.params._id, function(err, cards){     //uses By Id method to get specific card
    if(err){
      throw err;
    }
    res.json(cards);
  })
});

//add a Model
module.exports.addModelName = function(modelName, callback){  //under model.js to export method
  ModelName.create(modelName, callback);
}

app.post('api/task', function(req, res){    //builds method in app.js
  let model = req.body;
  ModelName.addModelName(model, function(err, model){
    if(err){
      throw err;
    }
    res.json(model)
  })
})

//rest easy
//decide headers
Content-Type  //under name
application/json //under value

//decide in body
{
  "keyHere": "valueHere"
}

//update a model
module.exports.updateModelName = function(id, modelName, options, callback){
  let query = {_id: id};
  let update = {
    name: modelName.name
  }
  ModelName.findOneAndUpdate(query, update, options, callback);   //finds and updates using mongoose
};

//update in app.js
app.put('/api/modelName/:id', function(req, res){
  let id = req.params.id;
  let tempModelName = req.body;
  ModelName.updateType(id, tempModelName, {}, function(err, tempModelName){
    if(err){
      throw err;
    }
    res.json(tempModelName);
  })
});
