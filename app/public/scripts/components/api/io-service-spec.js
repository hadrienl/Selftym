'use strict';

describe('Service: IO', function () {
  beforeEach(module('selftym'));

  var Io;

  beforeEach(inject(function (_Io_) {
    Io = _Io_;
  }));

  it('should emit an event', function () {
    expect(Io.emit).toBeDefined();
  });

  it('should listen to events', function () {

    var res;
    Io.on('foo', function (data) {
      res = data;
    });

    io.expectEvent('foo', 'bar');
    io.flush();

    expect(res).toBe('bar');
  });

  it('should stop listen to events', function () {

    var res;
    var on = Io.on('foo', function (data) {
      res = data;
    });

    io.expectEvent('foo', 'bar');
    io.flush();
    expect(res).toBe('bar');

    res = null;
    io.flush();
    expect(res).toBe('bar');

    res = null;
    io.flush();
    expect(res).toBe('bar');

    res = null;
    on();
    io.flush();
    expect(res).toBe(null);
  });

  it('should query the API', function () {
    io.expectEvent('foo:callback', 'foo');

    var res;
    Io.query('foo')
      .then(function (data) {
        res = data;
      });

    io.flush();

    expect(res).toBe('foo');
  });
});
