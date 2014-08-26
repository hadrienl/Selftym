'use strict';

module.exports = function (server, user) {
  user._socket.on('disconnect', function () {
    server.users.$remove(user);
     
    server.users.forEach(function (u) {
      u._socket.emit('user leave', JSON.stringify(user));
    });
  });
};
