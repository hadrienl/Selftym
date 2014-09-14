'use strict';

angular.module('selftym')
.service('Channel', function ($q, Io) {
  function Channel(name) {
    this.name = name;
    this.joined = false;
    this.users = [];
  }

  Channel.prototype._loadChannelData = function (data) {
    var self = this;
    this.users = data.users;

    this.$onChannelUpdate(function (data) {
      self._updateUser(data);
    });
    Io.on('channel:user_joined', function (data) {
      if (data.channel !== self.name) {
        return;
      }
      self.users.push(data.user);
    });
  };
  
  Channel.prototype._updateUser = function (data) {
    var user;

    angular.forEach(this.users, function (u) {
      if (u.id === data.user.id) {
        user = u;
        angular.extend(user, data.user);
      }
    });

    return user;
  };

  /**
   * Check if user is in channel
   */
  Channel.prototype.$isUserInChannel = function () {
    var deferred = $q.defer();

    Io.query('channel:joined', this.name)
      .then(function (data) {
        deferred.resolve(data);
      })
      .catch(function () {
        deferred.reject(false);
      });

    return deferred.promise;
  };

  /**
   * Request to join a channel
   */
  Channel.prototype.$join = function (selfy, nickname, mood) {
    var deferred = $q.defer(),
      self = this;

    if (!selfy) {
      deferred.reject('No selfy provided');
      return deferred.promise;
    }

    if (!nickname) {
      deferred.reject('No nickname provided');
      return deferred.promise;
    }

    Io.query('channel:join', {
      channel: this.name,
      selfy: selfy,
      nickname: nickname,
      mood: mood
    })
    .then(function (data) {
      self._loadChannelData(data);

      deferred.resolve(true);
    })
    .catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  /**
   * Update users's selfy
   */
  Channel.prototype.$updateSelfy = function (selfy) {
    Io.emit('channel:selfy', {
      channel: this.name,
      selfy: selfy
    });
  };

  // Events
  
  /**
   * Listen to channel update events
   * @deprecated
   */
  Channel.prototype.$onChannelUpdate = function (cb) {
    var channel = this.name;

    Io.on('channel:update', function (data) {
      if (data.channel === channel) {
        cb(data);
      }
    });
  };

  Channel.prototype.$getUsers = function () {
    Io.query('channel:users', {
        channel: this.name
      })
      .then(function (data) {
        console.error(data);
        this.users.splice(0, this.users.length);
        angular.forEach(data, function (d) {
          this.users.push(d);
        });
        return this.users;
      });
  };

  return Channel;
});
