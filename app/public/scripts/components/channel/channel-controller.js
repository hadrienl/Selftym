'use strict';

angular.module('selftym')
.controller('ChannelCtrl', function ($scope, $stateParams) {
  $scope.channel = $stateParams.channel;
});
