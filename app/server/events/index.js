'use strict';

module.exports = function (server, user) {
  ['broadcast_new_user',
   'user_update',
    'disconnect'].forEach(function (file) {
    require('./' + file)(server, user);
  });
};
