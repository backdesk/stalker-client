var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return {
      source : {
        _id : null,
        name : '',
        company : '',
        type : '',
        lastContact : null,
        status : null
      },
      message : null,
      pending : true
    }
  },

  onLoadSourceCompleted : function (source) {
    this.trigger({ source : source, pending : false });
  }
});