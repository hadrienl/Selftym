'use strict';

(function () {
  var listeners, expectations;

  window.io = function () {
    listeners = [],
    expectations = {};

    return {
      id: 1,
      emit: function () {},
      on: function (event, cb) {
        var listener = {
          event: event,
          callback: cb
        };
        listeners.push(listener);
        return listener;
      },
      removeListener: function (listener) {
        var pos = listeners.indexOf(listener);
        if (pos > -1) {
          listeners.splice(pos, 1);
        }
      }
    };
  };

  window.io.expectEvent = function (event, data) {
    expectations[event] = data;
  };
  window.io.flush = function () {
    listeners.forEach(function (l) {
      l.callback(expectations[l.event]);
    });
  };
})();
