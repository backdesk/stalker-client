var Reflux = require('reflux'),
    _ = require('lodash');

var leadStore = require('./lead');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  init : function () {
    this.listenTo(leadStore, this.onActivityChanged);

    this.activity = [];
  },

  onActivityChanged : function (data) {
    this.activity = data.lead.activity || [];

    this.trigger({ activity : this.activity });
  },

  getActivitySuccess : function (activity) {
    this.activity = this.activity.concat(activity);

    this.trigger({ activity : this.activity, chunk : this.activity.length });
  },

  logActivitySuccess : function (activity) {
    this.activity.unshift(activity);

    this.trigger({ activity : this.activity, result : 'success' });
  },

  logActivityFailed : function () {
    this.trigger({ activity : this.activity, result : 'failure' });
  }
});