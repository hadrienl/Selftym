module.exports = function (io) {
  var User = require('../models/user');

  var server = this;
  this.users = [];

  io.on('connection', function (socket) {
    var user = new User(socket);
    
    server.users.push(user);

    // TODO : first action : send all users data

    require('./user_update')(server, user);
    require('./disconnect')(server, user);
  });
};
