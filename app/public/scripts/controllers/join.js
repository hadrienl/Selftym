'use strict';

angular.module('selftym')
.controller('JoinCtrl', function ($scope, $stateParams, Io) {
  $scope.channel = $stateParams.channel;

  $scope.join = function () {
    Io.query('join', {channel: $scope.channel})
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
