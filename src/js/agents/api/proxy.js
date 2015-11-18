var mock = require('./mock');
var history = require('./mock.history');
var moment = require('moment');


var ABYSS_THRESHOLD = 604800 * 2;

var sortByName = function (data) {
  data.sort(function (a, b) {
    a = a.name.toLowerCase(), b = b.name.toLowerCase();

    if(a < b) return -1;
    if(a > b) return 1;

    return 0;
  });
};

var sortByLastContact = function (data) {
  data.sort(function (a, b) {
    a = moment(a.lastContact).unix(), b = moment(b.lastContact).unix();

    if(a > b) return -1;
    if(a < b) return 1;

    return 0;
  });
};


module.exports = {
  getById : function (id) {

  },

  get : function (mode, filter) {
    var data = mock.agents;

    if(mode) {
      if(mode === 'chase') {
        data = data.filter(function (agent) {
          var timeElapsed = moment().diff(moment(agent.lastContact), 'seconds');

          return agent.status === 'chasing' && timeElapsed < ABYSS_THRESHOLD;
        });

        sortByLastContact(data);
      }
    } else {
      sortByName(data);
    }

    if(filter) {
      filter = filter.split(':');

      if(filter[0] === 'status') {
        data = data.filter(function (agent) {
          return agent.status === filter[1];
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