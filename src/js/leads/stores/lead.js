var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  onLoadLeadCompleted : function (lead) {
  	this.trigger({ lead : lead });
  }
});