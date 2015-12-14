var Reflux = require('reflux'),
    _ = require('lodash');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  getInitialState : function () {
    return { leads : [] }
  },

  onLoadCompleted : function (leads) {
    this.leads = leads;
    this.trigger({ leads : leads });
  },

  onLoadFailed : function (err) {

  },

  onDismissCompleted : function (id) {
    this.leads = this.leads.map(function (lead) {
      if(lead._id === id) {
        lead.status = 'junk';
      }

      return lead;
    });

    this.trigger({ leads : this.leads });
  },

  onDismissFailed : function (err) {

  }
});