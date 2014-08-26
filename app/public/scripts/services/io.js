'use strict';

angular.module('selftym')
.service('Io', function ($q, $timeout) {
  var socket = io();

  return {
    query: function (request, params) {
      var deferred = $q.defer(),
        done = false;

      socket.emit(request, params);
      var on = socket.on(request + ':callback', function (data) {
        deferred.resolve(data);

        socket.removeListener(on);

        done = true;
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
