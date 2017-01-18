var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + '/main.js');
});

app.get('/styles.css', function(req, res) {
    res.sendFile(__dirname + '/styles.css');
});


io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
   
});


http.listen(process.env.PORT || 5000, function() {
    console.log('listening on ' + process.env.PORT || 5000);
});


