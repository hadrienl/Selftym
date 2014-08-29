var _ = require('lodash');

var Collection = function (data) {
  var self = this;
  if (Array.isArray(data)) {
    _.each(data, function (v, k) {
      self[k] = v;
    });
  }
};
Collection.prototype = [];
Collection.prototype.$remove = function (user) {
  var pos = _.indexOf(this, user);
  if (pos > -1) {
    this.splice(pos, 1);
  }
};

module.exports = Collection;
