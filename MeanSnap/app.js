var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const screenshot = require('screenshot-stream');
app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var i = 0;

app.get('/snap', function(req, res){
console.log(req.query.url == 'http://')
  if(req.query.url == 'http://' || req.query.url == undefined ){
      res.send(getSnaps())
  }else{
     var site = req.query.url;

     const stream = screenshot(site, '1024x768', {crop: true});
     var files = fs.readdirSync(__dirname + '/public/img/').length;

     stream.pipe(fs.createWriteStream(__dirname + '/public/img/test-'+files+'.png'));

     res.send(getSnaps())
  }


});

app.get('/', function(req, res){
  var snaps = getSnaps()
  res.send(snaps);

});

function getSnaps() {
    var files = fs.readdirSync(__dirname + '/public/img/');
    var snaps = [];

    for(var i in files){
        snaps.push({id: i, image: files[i]})
    }

    return snaps
}

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', {type:'new-message', text: message});
    });
});


http.listen(1401, function(){
  console.log('listening on *:1401');
});
