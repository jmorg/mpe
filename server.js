var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + '/main.js');
});

app.get('/morestyles.css', function(req, res) {
    res.sendFile(__dirname + '/morestyles.css');
});

app.get('/othermain.js', function(req, res) {
    res.sendFile(__dirname + '/othermain.js');
});

app.get('/common.js', function(req, res) {
    res.sendFile(__dirname + '/common.js');
});

app.get('/ga.js', function(req, res) {
    res.sendFile(__dirname + '/ga.js');
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


