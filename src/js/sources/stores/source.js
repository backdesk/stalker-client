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
        status : null,
        notes : ''
      },
      message : null,
      pending : true
    }
  },

  onLoadSourceCompleted : function (source) {
    this.trigger({ source : source, pending : false });
  },

  onUpdateSuccess : function (source) {
    this.trigger({ source : source, errors : null, result: 'success', pending : false });
  },

  onUpdateFailed : function (source, errors) {
    this.trigger({ source : source, errors : errors, result: 'failed', pending : false });
  }
});