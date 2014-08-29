'use strict';

describe('Controller: ChannelCtrl', function () {

  beforeEach(module('selftym'));

  var scope,
    Channel,
    ChannelCtrl;

  beforeEach(inject(function ($rootScope, $controller, _Channel_) {
    scope = $rootScope.$new();
    Channel = _Channel_;
    ChannelCtrl = $controller('ChannelCtrl', {
      $scope: scope,
      $stateParams: {
        channel: 'foobar'
      }
    });
  }));

  it('should have a Channel object', function () {
    expect(scope.channel.constructor).toBe(Channel);
    expect(scope.channel.name).toBe('foobar');
    expect(scope.channel.joined).toBe(false);
  });

  it('should have joined channel', function () {
    io.expectEvent('channel:joined:callback', true);
    io.flush();
    expect(scope.channel.joined).toBe(true);
  });
});
