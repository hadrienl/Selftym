'use strict';

module.exports = function (server, user) {

  /**
   * User has disconnected, leave all channels and inform all other users
   */
  user._socket.on('disconnect', function () {
    server.userDisconnect(user);
  });
};
