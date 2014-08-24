'use strict';

var User = function (socket) {
  this._socket = socket;
  this.id = this._socket.id;
};
User.prototype.update = function (data) {
  var self = this;
  for (var i in data) {
    if (i !== 'socket' && i !== 'id') {
      self[i] = data[i];
    }
  }
};
User.prototype.toJSON = function () {
  return {
    id: this.id,
    mood: this.mood
  };
};

module.exports = User;
