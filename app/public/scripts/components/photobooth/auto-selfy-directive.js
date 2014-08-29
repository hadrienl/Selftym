'use strict';

angular.module('selftym')
.directive('autoSelfy', function ($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/components/photobooth/auto-selfy.html',
    scope: {
      onError: '&',
      onSelfy: '&'
    },
    link: function (scope) {
      scope.interval = 1;
      scope.onStream = function (video) {
        takeSelfy(video);
      };
      scope.error = function (error) {
        scope.onError({error: error});
      };

      function takeSelfy(video) {
        scope.onSelfy({
          selfy: getVideoData(video, 0, 0, video.width, video.height)
        });

        $timeout(function () {
          takeSelfy(video);
        }, scope.interval * 1000);
      }

      function getVideoData(video) {
        var hiddenCanvas = angular.element('<canvas></canvas>')[0];
        hiddenCanvas.width = video.width;
        hiddenCanvas.height = video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, video.width, video.height);

        return hiddenCanvas.toDataURL();
      }
    }
  };
});