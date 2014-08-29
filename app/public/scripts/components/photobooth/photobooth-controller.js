'use strict';

angular.module('selftym')
.controller('PhotoboothCtrl', function ($scope) {

  var channel = $scope.channel;

  $scope.selfy = null;

  $scope.join = function () {
    channel.$join(
        $scope.selfy,
        $scope.nickname,
        $scope.baseline
      )
    .then(function () {
      channel.joined = true;
    })
    .catch(function () {
      channel.joined = false;
    });
  };

  $scope.onError = function (error) {
    console.error(error);
  };

  $scope.onSelfy = function (selfy) {
    $scope.selfy = selfy;
    if (channel.joined) {
      channel.$updateSelfy(selfy);
    }
  };
});
