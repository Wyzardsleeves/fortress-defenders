//Notes for a rest-api


//connect to mongoose
mongoose.connect('mongodb://localhost/fortressdefenders');
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
