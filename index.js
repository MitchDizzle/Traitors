// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'src')));

// Import the fs
var fs = require('fs');
// Import the Anagrammatix game file
var agx = require('./agxgame');
const { env } = require('process');

var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io')(server);

// Reduce the logging output of Socket.IO
//io.set('log level',1);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    agx.initGame(io, socket);
});
