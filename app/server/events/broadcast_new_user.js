'use strict';

module.exports = function (server, user) {
  server.users.forEach(function (u) {
    u._socket.emit('user join', JSON.stringify(user));
  });
  user._socket.emit('users', JSON.stringify(server.users));
};
