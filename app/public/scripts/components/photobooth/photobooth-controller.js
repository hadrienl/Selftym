'use strict';

angular.module('selftym')
.controller('PhotoboothCtrl', function ($scope, $stateParams, $timeout, Io) {
  $scope.join = function () {
    Io.query('channel:join', {
        channel: $stateParams.channel,
        nickname: $scope.nickname,
        baseline: $scope.baseline
      })
      .then(function (data) {
        console.log(data);
      });
  };

  $scope.onError = function (error) {
    console.error(error);
  };

  $scope.onSelfy = function (selfy) {
    Io.emit('channel:selfy', {
      channel: $stateParams.channel,
      selfy: selfy
    });
  };
});
