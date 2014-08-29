'use strict';

module.exports = function (server, user) {

  /**
   * Check if user has already joined a channel
   */
  user.$socket.on('channel:joined', function (channel) {
    user.$socket.emit('channel:joined:callback', user.$isInChannel(channel));
  });

  /**
   * A user ask to join the channel. He needs to send a selfy and a nickname
   */
  user.$socket.on('channel:join', function (data) {
    if (!data.channel) {
      user.$socket.emit('channel:join:callback', {
        error: 'wrong channel'
      });
      return;
    }
    user.$join(data.channel);

    if (data.selfy) {
      user.selfy = data.selfy;
    }
    if (data.nickname) {
      user.nickname = data.nickname;
    }
    if (data.baseline) {
      user.baseline = data.baseline;
    }
    user.$socket.emit('channel:join:callback', {
      ok: true
    });
  });

  /**
   * User update his selfy. The selfy is broadcasted to all channel's users
   */
  user.$socket.on('channel:selfy', function (data) {
    user.selfy = data.selfy;

    user.$channels.forEach(function (channel) {
      server.users.$inChannel(channel).forEach(function (u) {
        u.$socket.emit('channel:update', {
          channel: channel,
          user: user
        });
      });
    });
  });
};
