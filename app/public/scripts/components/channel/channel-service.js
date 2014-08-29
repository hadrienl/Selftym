'use strict';

angular.module('selftym')
.service('Channel', function ($q, Io) {
  var Channel = function (name) {
    this.name = name;
    this.joined = false;
  };
  Channel.prototype = {
    /**
     * Check if user is in channel
     */
    $isUserInChannel: function () {
      var deferred = $q.defer();

      Io.query('channel:joined', this.name)
        .then(function (data) {
          deferred.resolve(data);
        })
        .catch(function () {
          deferred.reject(false);
        });

      return deferred.promise;
    },

    /**
     * Request to join a channel
     */
    $join: function (selfy, nickname, baseline) {
      var deferred = $q.defer(),
        go = true;

      if (!selfy) {
        deferred.reject('No selfy provided');
        go = false;
      }

      if (!nickname) {
        deferred.reject('No nickname provided');
        go = false;
      }

      if (go) {
        Io.query('channel:join', {
          channel: this.name,
          selfy: selfy,
          nickname: nickname,
          baseline: baseline
        })
        .then(function () {
          deferred.resolve(true);
        })
        .catch(function () {
          deferred.reject(false);
        });
      }

      return deferred.promise;
    },

    /**
     * Update users's selfy
     */
    $updateSelfy: function (selfy) {
      Io.emit('channel:selfy', {
        channel: this.name,
        selfy: selfy
      });
    },

    // Events
    
    /**
     * Listen to channel update events
     */
    $onChannelUpdate: function (cb) {
      var channel = this.name;

      Io.on('channel:update', function (data) {
        if (data.channel === channel) {
          cb(data);
        }
      });
    }
  };

  return Channel;
});
