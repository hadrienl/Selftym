var Collection = require('../utils/collection');

var Users = function () {
  Collection.apply(this, arguments);
};

Users.prototype = new Collection();
Users.prototype._super = Collection;
Users.prototype.constructor = Users;

Users.prototype.$inChannel = function (channel) {
  var usersInChannel = [];
  this.forEach(function (u) {
    if (u.$isInChannel(channel)) {
      usersInChannel.push(u);
    }
  });

  return usersInChannel;
};

module.exports = Users;
