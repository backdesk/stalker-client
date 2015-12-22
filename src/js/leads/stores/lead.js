var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return {
      lead : {
        _id : null,
        details : '',
        description : '',
        activity : []
      },
      message : null,
      pending : true
    }
  },

  onLoadLeadCompleted : function (lead) {
    this.trigger({ lead : lead, pending : false });
  },

  onUpdateSuccess : function (lead) {
    this.trigger({ lead : lead, errors : null, result: 'success', pending : false });
  },

  onUpdateFailed : function (lead, errors) {
    this.trigger({ lead : lead, errors : errors, result: 'failed', pending : false });
  },

  onCreateSuccess : function (lead) {
    this.trigger({ lead : lead, errors : null, result: 'success' });
  },

  onCreateFailed : function (lead, errors) {
    this.trigger({ lead : lead, errors : errors, result: 'failed' });
  }
});