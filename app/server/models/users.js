var _ = require('lodash');

var Users = function (data) {
  var self = this;
  if (Array.isArray(data)) {
    _.each(data, function (v, k) {
      self[k] = v;
    });
  }
};
Users.prototype = [];
Users.prototype.$remove = function (user) {
  var pos = _.indexOf(this, user);
  if (pos > -1) {
    this.splice(pos, 1);
  }
};

module.exports = Users;
