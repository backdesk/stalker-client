var Reflux = require('reflux');
var moment = require('moment');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return { leads : [] }
  },

  onLoadCompleted : function (leads) {
    this.trigger({ leads : leads });
  }
});