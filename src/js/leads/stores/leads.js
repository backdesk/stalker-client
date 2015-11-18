var Reflux = require('reflux');

module.exports = Reflux.createStore({
  listenables : require('../actions'),

  find : function () {
    return [].find.apply(this.leads, arguments);
  },

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
    var lead = this.find(function (lead) {
      return lead._id === id;
    });

    if(lead) {
      lead.status = 'junk';
    }

    this.trigger({ leads : this.leads });
  },

  onDismissFailed : function (err) {

  }
});