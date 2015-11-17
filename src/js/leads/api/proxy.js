var mock = require('./mock');

var ACTIVE_STATES = ['pending', 'applied'];

module.exports = {
  getById : function (id) {
    var data = mock;

    data = data.find(function (lead) {
      return lead._id === id;
    });

    return new Promise(function(resolve, reject) {
      if(data) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  get : function (filter) {
    var data = mock;

    if(filter) {
      filter = filter.split(':');

      if(filter[0] === 'status') {
        data = mock.filter(function (lead) {
          return lead.status === filter[1];
        });

        data = data.map(function (lead) {
          var obj = {}, fields = ['_id', 'created', 'lastUpdate', 'details', 'status'];

          fields.forEach(function (f) {
            obj[f] = lead[f];
          });

          return obj;
        });
      }
    }

    return new Promise(function(resolve, reject) {
      resolve(data);
    });
  },

  create : function () {

  },

  update : function () {

  }
};