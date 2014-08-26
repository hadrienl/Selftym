'use strict';

module.exports = function (server, user) {
  ['broadcast_new_user',
   'user_update',
    'disconnect',
    'test'].forEach(function (file) {
    require('./' + file)(server, user);
  });
};
