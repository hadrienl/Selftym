'use strict';

angular.module('selftym')
.service('Io', function ($rootScope, $q, $timeout, UUID) {
  var socket = io(),
    ls = window.localStorage;

  if (!ls.session) {
    ls.session = UUID();
  }

  socket.emit('auth', ls.session);

  return {
    emit: function (e, data) {
      return socket.emit(e, data);
    },
    on: function (e, callback) {
      var on = socket.on(e, function () {
        $rootScope.$apply(callback.apply(this, arguments));
      });

      return function () {
        socket.removeListener(on);
      };
    },
    query: function (request, params) {
      var deferred = $q.defer(),
        done = false;

      socket.emit(request, params);
      var on = socket.on(request + ':callback', function (data) {
        deferred.resolve(data);

        socket.removeListener(on);

        done = true;

        $rootScope.$apply();
      });

      $timeout(function () {
        if (!done) {
          socket.removeListener(on);
          deferred.reject('timeout');
        }
      }, 10000);

      return deferred.promise;
    }
  };
});
