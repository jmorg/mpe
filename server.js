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

app.get('/main.css', function(req, res) {
    res.sendFile(__dirname + '/main.css');
 });

app.get('/file-io.js', function(req, res){
    res.sendFile(__dirname+'/file-io.js');
});

app.get('/uploadedFiles/*', function(req, res){
    res.sendFile(__dirname + req.url);
});

app.get("/file_upload", function(req, res){
    res.json({message: "Blah"});
});

app.post('/file_upload', upload.single('file'), function(req, res, next) {
  var file = 'uploadedFiles/' + req.file.filename +".jpg";
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
        io.emit('get file', file);
        res.end();
    }
  });
});

http.listen(process.env.PORT || 5000, function() {
    console.log('listening on ' + process.env.PORT || 5000);
});


