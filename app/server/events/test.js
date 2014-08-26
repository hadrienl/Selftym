'use strict';

module.exports = function (server, user) {
  user._socket.on('join', function (data) {
    user._socket.emit('join:callback', {ok: true});
  });
};
