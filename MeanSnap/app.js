var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var phantom = require('phantom');
const fs = require('fs');

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
  if(req.query.url == 'http://' || req.query.url == undefined ){
      res.send(getSnaps())
  }else{
     var site = req.query.url;
     var files = fs.readdirSync(__dirname + '/public/img/').length;

      phantom.create().then(function(ph) {
          ph.createPage().then(function(page) {
              page.property('viewportSize', {width: 1920, height: 1080}).then(function() {
                  page.open(site).then(function(status) {
                      page.renderBase64('PNG').then(function(data) {
                          var imgData = 'data:image/png;base64,'+data;

                          var data = imgData.replace(/^data:image\/\w+;base64,/, "");
                          var buf = new Buffer(data, 'base64');
                          fs.writeFile(__dirname + '/public/img/test-'+files+'.png', buf, (err) => {
                              if (err) throw err;
                              io.emit('message', 'imageSaved');
                              res.send(getSnaps())
                          });
                          ph.exit();
                      });
                  });
              });
          });
      });
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
        if(files[i] != 'index.html')
        snaps.push({id: i, image: files[i]})
    }

    return snaps
}

io.on('connection', function(socket) {
    console.log('User Connected');
});


http.listen(1401, function(){
  console.log('listening on *:1401');
});
