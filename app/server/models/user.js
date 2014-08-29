'use strict';

var _ = require('lodash');

var User = function (socket) {
  this._socket = socket;
  this.id = this._socket.id;
  this._channels = [];
};
User.prototype.update = function (data) {
  var self = this;
  for (var i in data) {
    if (i !== 'socket' && i !== 'id') {
      self[i] = data[i];
    }
  }
};
User.prototype.join = function (channel) {
  if (_.indexOf(this._channels, channel) > -1) {
    return true;
  }
  this._channels.push(channel);
  return true;
};
User.prototype.toJSON = function () {
  return {
    id: this.id,
    mood: this.mood
  };
};

module.exports = User;
