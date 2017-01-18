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
      res.send(500);
    } else {
        io.emit('get file', file);
      // res.send({file: req.file.path});
    }
  });
});

// io.sockets.on('connection', function(socket){
//   var delivery = dl.listen(socket);
//   delivery.on('delivery.connect',function(delivery){
 
//     delivery.send({
//       name: 'sample-image.jpg',
//       path : './sample-image.jpg',
//       params: {foo: 'bar'}
//     });
 
//     delivery.on('send.success',function(file){
//       console.log('File successfully sent to client!');
//     });
 
//   });
// });

// io.on('connection', function(socket) {
//     console.log('a user connected');
//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });

//     var delivery = dl.listen(socket);
//     delivery.on('receive.success',function(file){
//     var params = file.params;
//     fs.writeFile(file.name,file.buffer, function(err){
//       if(err){
//         console.log('File could not be saved.');
//       }else{
//         console.log('File saved.');
//       };
//     });
//   });

//     socket.on('chat message', function(msg) {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
//     });
   
// });




http.listen(process.env.PORT || 5000, function() {
    console.log('listening on ' + process.env.PORT || 5000);
});


