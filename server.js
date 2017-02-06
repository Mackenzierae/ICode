//grabbing what I installed
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))

//sets the default static directory.
app.use(express.static(path.join(__dirname, 'client')))


require('./server/config/mongoose.js')

var routeSetter = require('./server/config/routes.js')(app);

app.listen(8000, function(){
  console.log('running on port 8000')
})
