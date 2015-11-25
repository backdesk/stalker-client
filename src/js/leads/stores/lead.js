var Reflux = require('reflux'),
    update = require('react-addons-update');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return {
      lead : {
        _id : null,
        details : '',
        description : '',
        comments : []
      },
      message : null
    }
  },

  onLoadLeadCompleted : function (lead) {
    this.trigger({ lead : lead });
  },

  onUpdateSuccess : function (lead) {
    this.trigger({ lead : lead, errors : null, message: 'Success' });
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