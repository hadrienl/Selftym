'use strict';

describe('Controller: PhotoboothCtrl', function () {
  beforeEach(module('selftym'));

  var scope;

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();
    scope.channel = {
      $join: function () {
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      },
      $updateSelfy: jasmine.createSpy('$updateSelfy')
    };
    $controller('PhotoboothCtrl', {
      $scope: scope
    });
  }));

  it('should join channel', function () {
    spyOn(scope.channel, '$join').andCallThrough();

    scope.selfy = 'selfy';
    scope.nickname = 'nickname';
    scope.baseline = 'baseline';
    
    scope.join();
    scope.$digest();

    expect(scope.channel.$join).toHaveBeenCalledWith(
      'selfy', 'nickname', 'baseline');
    expect(scope.channel.joined).toBe(true);
  });

  it('should update selfy', function () {
    scope.channel.joined = false;
    scope.onSelfy('no selfy');
    expect(scope.channel.$updateSelfy).not.toHaveBeenCalled();

    scope.channel.joined = true;
    scope.onSelfy('selfy');
    expect(scope.channel.$updateSelfy).toHaveBeenCalledWith('selfy');
  });

});
