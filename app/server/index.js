var Users = require('./models/users');

module.exports = function (io) {
  var User = require('./models/user');

  var server = this;
  this.users = new Users();

  io.on('connection', function (socket) {
    var user = new User(socket);
    
    server.users.push(user);
    require('./events')(server, user);
  });
};
