'use strict';

angular.module('selftym')
.controller('ChannelCtrl', function ($scope, $stateParams, Channel) {
  var channel = $scope.channel = new Channel($stateParams.channel);

  $scope.miniphotobooth = false;

  channel.$isUserInChannel()
    .then(function (data) {
      channel.joined = data;
    });
});
