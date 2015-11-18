var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  init : function () {

  },

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
    this.lead = lead;
    this.trigger({ lead : lead });
  },

  onChangeStatus : function (status) {
    this.lead.status = status;
    this.trigger({ lead : this.lead });
  }
});