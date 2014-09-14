'use strict';

var _ = require('lodash');

var User = function (socket) {
  this.$socket = socket;
  this.$channels = [];
  this.id = this.$socket.id;
};

/**
 * Check if user is in a channel
 */
User.prototype.$isInChannel = function (channel) {
  return _.indexOf(this.$channels, channel) > -1;
};

/**
 * Join a channel
 */
User.prototype.$join = function (channel) {
  if (this.$isInChannel(channel)) {
    return true;
  }
  this.$channels.push(channel);
  return true;
};

/**
 * Leave all channels
 */
User.prototype.$leaveAllChannels = function () {
  this.$channels.splice(0, this.$channels.length);
};

/**
 * JSON representation
 */
User.prototype.toJSON = function () {
  return {
    id: this.id,
    selfy: this.selfy,
    nickname: this.nickname,
    mood: this.mood
  };
};

module.exports = User;
