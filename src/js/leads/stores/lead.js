var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return {
      lead : {
        _id : null,
        details : '',
        description : '',
        comments : []
      }
    }
  },

  onLoadLeadCompleted : function (lead) {
    this.trigger({ lead : lead });
  },

  onUpdateSuccess : function (lead) {
    this.trigger({ lead : lead, errors : null });
  },

  onUpdateFailed : function (lead, errors) {
    this.trigger({ lead : lead, errors : errors });
  },

  onCreateSuccess : function (lead) {
    this.trigger({ lead : lead, errors : null });
  },

  onCreateFailed : function (lead, errors) {
    this.trigger({ lead : lead, errors : errors });
  }
});