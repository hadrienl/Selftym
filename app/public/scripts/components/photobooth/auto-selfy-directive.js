'use strict';

angular.module('selftym')
.directive('autoSelfy', function () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/components/photobooth/auto-selfy.html',
    scope: {
      onError: '&',
      onSelfy: '&'
    },
    controller: 'AutoSelfyCtrl'
  };
});
