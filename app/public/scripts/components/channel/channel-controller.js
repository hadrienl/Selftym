'use strict';

angular.module('selftym')
.controller('ChannelCtrl', function ($scope, $stateParams, Io) {
  $scope.channel = $stateParams.channel;

  Io.on('channel:update', function (data) {
    $scope.testselfy = data.user.selfy;
  });
});
