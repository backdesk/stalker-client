var mock = require('./mock.json');

var ACTIVE_STATES = ['pending', 'applied'];

var findById = function (id) {
  var data = mock.leads;

  return data.find(function (lead) {
    return lead._id === id;
  });
}

module.exports = {
  getById : function (id) {
    var data = findById(id);

    return new Promise(function(resolve, reject) {
      if(data) {
        resolve(data);
      } else {
        reject({
          message : 'No record lead found.'
        });
      }
    });
  },

  get : function (filter) {
    var data = mock.leads;

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

  create : function () {

  },

  update : function (lead) {
    return new Promise(function(resolve, reject) {
      resolve(lead);
    });
  },

  dismiss : function (id) {
    var data = findById(id);

    return new Promise(function(resolve, reject) {
      if(data) {
        resolve(data._id);
      } else {
        reject({
          message : 'This lead just won\'t take no for an answer'
        });
      }
    });
  }
};