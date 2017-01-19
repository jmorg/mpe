var app = require('express')();
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');
var dl = require('delivery');
var upload = multer({dest: __dirname + '/uploadedFiles/'});

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });

app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + '/main.js');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});

app.get('/main.css', function(req, res) {
    res.sendFile(__dirname + '/main.css');
 });

app.get('/file-io.js', function(req, res){
    res.sendFile(__dirname+'/file-io.js');
});

app.get('/uploadedFiles/*', function(req, res){
    res.sendFile(__dirname + req.url);
});

app.get("/img_upload", function(req, res){
    res.json({message: "Blah"});
});

app.get("/third_party/flat-ui/dist/css/flat-ui.css", function(req, res) {
  res.sendFile(__dirname + '/third_party/flat-ui/dist/css/flat-ui.css');
})

app.post('/img_upload', upload.single('file'), function(req, res, next) {
  var file = 'uploadedFiles/' + req.file.filename +".jpg";
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        io.emit('get img', file);
        res.sendStatus(200);
    }
  });
});

app.post('/link_upload', upload.single('hyperlink'), function(req, res, next) {
  io.emit('get link', req.hyperlink);
  res.sendStatus(200);
});

app.post('/vid_upload', upload.single('file'), function(req, res, next) {
  var file = 'uploadedFiles/' + req.file.filename +".mp4";
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        io.emit('get vid', file);
        res.sendStatus(200);
    }
  });
});

app.post('/voice_upload', upload.single('file'), function(req, res, next) {
  var file = 'uploadedFiles/' + req.file.filename +".mp3";
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        io.emit('get voice', file);
        res.sendStatus(200);
    }
  });
});


io.on('connection', function(socket) {
    io.emit('load local storage');
    
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
   
});


http.listen(3000, function() {
    console.log('listening on ' + process.env.PORT || 5000);
});

