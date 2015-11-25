var store = require('../../shared/store.local')(),
    utils = require('../../shared/utils');

store.init('leads', require('./mock.json'));

module.exports = {
  getById : function (id) {
    var data = store.find(id, 'leads');

    return new Promise(function(resolve, reject) {
      if(data) {
        resolve(data);
      } else {
        reject({
          message : 'No record found.'
        });
      }
    });
  },

  get : function (filter) {
    var data = store.read().leads;

    if(filter) {
      filter = filter.split(':');

      if(filter[0] === 'status') {
        data = data.filter(function (lead) {
          return lead.status === filter[1];
        });
      }
    }

    data = data.map(function (lead) {
      var obj = {}, fields = ['_id', 'created', 'lastUpdate', 'details', 'status', 'source'];

      fields.forEach(function (f) {
        obj[f] = lead[f];
      });

      return obj;
    });

    return new Promise(function(resolve, reject) {
      resolve(data);
    });
  },

  create : function (lead) {
    var data = store.read();

    lead._id = utils.genObjId();

    data.leads.push(lead);
    store.save(data);

    return new Promise(function(resolve, reject) {
      resolve(lead);
    });
  },

  update : function (lead) {
    var updated = false, index, data = store.read();

    data.leads = data.leads.map(function (item) {
      if(item._id === lead._id) {
        return lead;
      }

      return item;
    });

    store.save(data);

    return new Promise(function(resolve, reject) {
      resolve(lead);
    });
  },

  dismiss : function (id) {
    var updated = false, data = store.read();

    data.leads = data.leads.map(function (item) {
      if(item._id === id) {
        updated = true;
        item.status = 'junk';
      }

      return item;
    });

    store.save(data);

    return new Promise(function(resolve, reject) {
      if(updated) {
        resolve(id);
      } else {
        reject({
          message : 'This lead just won\'t take no for an answer'
        });
      }
    });
  }
};