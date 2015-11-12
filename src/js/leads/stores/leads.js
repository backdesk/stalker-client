var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return { leads : [] }
  },

  onLoadCompleted : function (leads) {
  	this.trigger({ leads : leads });
  }
});