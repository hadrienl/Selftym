'use strict';

module.exports = function(server, user) {
  user._socket.on('disconnect', function () {
    // TODO remove user from users
  });
};
