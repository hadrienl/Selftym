'use strict';

describe('Service: Channel', function () {

  beforeEach(module('selftym'));

  var Channel,
    Io,
    $rootScope;

  beforeEach(inject(function (_$rootScope_, _Io_, _Channel_) {
    $rootScope = _$rootScope_;
    Io = _Io_;
    Channel = _Channel_;
  }));

  it('should have attributes', function () {
    var channel = new Channel('foobar');
    expect(channel.name).toBe('foobar');
    expect(channel.joined).toBe(false);
  });

  it('should ask server if user is in channel', function () {
    var channel = new Channel('foobar'),
      isIn;

    io.expectEvent('channel:joined:callback', true);

    channel.$isUserInChannel()
      .then(function (data) {
        isIn = data;
      })
      .catch(function (data) {
        isIn = data;
      });

    io.flush();
    expect(isIn).toBe(true);
  });

  it('should join a channel', function () {
    var channel = new Channel('foobar'),
      res;

    channel.$join('selfy', 'Foo', 'in the bar we trust')
      .then(function (data) {
        res = data;
      });

    io.expectEvent('channel:join', true);
    io.flush();

    expect(res).toBe(true);
  });

  it('should not join a channel without selfy', function () {
    var channel = new Channel('foobar'),
      res;

    channel.$join()
      .catch(function (error) {
        res = error;
      });

    $rootScope.$digest();

    expect(res).toBe('No selfy provided');
  });

  it('should not join a channel without name', function () {
    var channel = new Channel('foobar'),
      res;

    channel.$join('selfy')
      .catch(function (error) {
        res = error;
      });

    $rootScope.$digest();

    expect(res).toBe('No nickname provided');
  });

  it('should update selfy', function () {
    var channel = new Channel('foobar');

    spyOn(Io, 'emit');

    channel.$updateSelfy('selfy');

    expect(Io.emit).toHaveBeenCalledWith(
      'channel:selfy',
      {
        channel: 'foobar',
        selfy: 'selfy'
      }
    );
  });

  it('should listen to channel updated', function () {
    var channel = new Channel('foobar'),
      res;

    io.expectEvent('channel:update', {
      channel: 'foobar',
      selfy: 'a new selfy'
    });

    channel.$onChannelUpdate(function (data) {
      res = data;
    });

    io.flush();

    expect(res.selfy).toBe('a new selfy');
  });

  it('should not receive notification on other channel', function () {
    var channel = new Channel('foobar'),
      res;

    io.expectEvent('channel:update', {
      channel: 'other channel',
      selfy: 'a new selfy'
    });

    channel.$onChannelUpdate(function (data) {
      res = data;
    });

    io.flush();

    expect(res).not.toBeDefined();
  });
});
