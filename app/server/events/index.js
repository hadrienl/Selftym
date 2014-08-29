'use strict';

module.exports = function (server, user) {
  [ 'channel' ].forEach(function (file) {
    require('./' + file)(server, user);
  });
};
