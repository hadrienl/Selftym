'use strict';

module.exports = function (server, user) {
  user._socket.on('auth', function (uuid) {
    console.log(uuid);
    /*var user = server.users.getByUUID(uuid);
    if (!user) {
      user.uuid = uuid;
      user.connected = true;
    }
    user._socket.emit('auth:callback', {ok: true});*/
  });
};
