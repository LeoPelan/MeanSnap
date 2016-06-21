var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
const screenshot = require('screenshot-stream');
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/screen', function(req, res){
  var site = req.query.url;
  const stream = screenshot(site, '1024x768', {crop: true});

stream.pipe(fs.createWriteStream(__dirname  + '/public/test.png'));
res.sendStatus(200)
});

io.on('connection', function(socket){
  console.log('connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
