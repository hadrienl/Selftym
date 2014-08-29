'use strict';

module.exports = function (server, user) {
  user._socket.on('channel:join', function (data) {
    console.log(data);
    if (!data.channel) {
      user._socket.emit('channel:join:callback', {
        error: 'wrong channel'
      });
      return;
    }
    user.join(data.channel);
    if (data.nickname) {
      user.nickname = data.nickname;
    }
    if (data.baseline) {
      user.baseline = data.baseline;
    }
    console.log(user);
    user._socket.emit('channel:join:callback', {
      ok: true
    });
  });
};
