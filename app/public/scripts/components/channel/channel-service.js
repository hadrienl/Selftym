'use strict';

angular.module('selftym')
.service('Channel', function ($q, Io) {
  function Channel(name) {
    this.name = name;
    this.joined = false;
  }
  
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
  Channel.prototype.$join = function (selfy, nickname, baseline) {
    var deferred = $q.defer();

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
      baseline: baseline
    })
    .then(function () {
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
   */
  Channel.prototype.$onChannelUpdate = function (cb) {
    var channel = this.name;

    Io.on('channel:update', function (data) {
      if (data.channel === channel) {
        cb(data);
      }
    });
  };

  return Channel;
});
