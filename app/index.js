'use strict';

var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http').Server(app),
  io = require('socket.io')(http);

// Server statics
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (request, response) {
  response.sendfile(__dirname + '/public/index.html');
});

// IO Server
require('./server')(io);

http.listen(3000, function () {
  console.log('listening on *:3000');
});
