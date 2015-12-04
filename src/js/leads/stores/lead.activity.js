var Reflux = require('reflux');

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

  logActivitySuccess : function (activity) {
    this.activity.unshift(activity);

    this.trigger({ activity : this.activity });
  },

  logActivityFailed : function () {
    console.log(arguments);
  }
});