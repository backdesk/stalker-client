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
        notes : '',
        scratches : 0,
        tickles : 0,
        strikes : 0
      },
      message : null,
      pending : true
    }
  },

  onLoadSourceCompleted : function (source) {
    this.source = source;

    this.trigger({ source : this.source, pending : false });
  },

  onUpdateSuccess : function (source) {
    this.source = source;

    this.trigger({ source : this.source, errors : null, result: 'success', pending : false });
  },

  onUpdateFailed : function (source, errors) {
    this.trigger({ source : source, errors : errors, result: 'failed', pending : false });
  },

  onConditionSuccess : function (type) {
    this.source[type]++;

    this.trigger({ source : this.source });
  }
});