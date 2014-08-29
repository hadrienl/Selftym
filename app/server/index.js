var Users = require('./models/users'),
  User = require('./models/user');

module.exports = function (io) {
  var server = this;
  this.users = new Users();

  this.userDisconnect = function (user) {
    user.$channels.forEach(function (channel) {
      this.users.$inChannel(channel).forEach(function (userInChannel) {
        if (userInChannel !== user) {
          userInChannel.$socket.emit('channel:user-leave', {
            id: user.id
          });
        }
      });
    });
    user.$leaveAllChannels();
  };

  io.on('connection', function (socket) {
    var user = new User(socket);
    
    server.users.push(user);
    require('./events')(server, user);
  });
};
