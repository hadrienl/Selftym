'use strict';

angular.module('selftym')
.controller('PhotoboothCtrl', function ($scope, $stateParams, Io) {
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
});
