'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server = require('./server')(io);

app.get('/', function (req, res) {
  res.sendfile('./views/home.html');
});
app.get('/:channel', function (req, res) {
  res.sendfile('./views/channel.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
