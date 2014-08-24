'use strict';

module.exports = function (server, user) {
  // On user update, send new data to all users
  user._socket.on('user update', function (data) {
    try {
      user.update(JSON.parse(data));
    }
    catch (e) {
      return;
    }

    server.users.forEach(function (u) {
      u._socket.emit('user update', JSON.stringify(user));
    });
  });
};
