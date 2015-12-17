var Reflux = require('reflux'),
    _ = require('lodash');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  findTagsSuccess : function (tags) {
    this.trigger({ suggestions : tags });
  }
});