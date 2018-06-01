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
rename a collection     //db.eexample.renameCollection("example")
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
