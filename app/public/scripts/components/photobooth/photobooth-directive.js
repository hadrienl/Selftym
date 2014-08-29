'use strict';

angular.module('selftym')
.directive('photobooth', function () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/components/photobooth/photobooth.html',
    controller: 'PhotoboothCtrl',
    scope: {
      channel: '='
    }
  };
});
