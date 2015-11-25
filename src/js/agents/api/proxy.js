var store = require('../../shared/store.local')(),
    utils = require('../../shared/utils'),
    moment = require('moment');

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

store.init('agents', require('./mock.json'));

module.exports = {
  getById : function (id) {

  },

  find : function (term) {
    var rx, data = store.read().agents, results = [];

    rx = new RegExp('^' + utils.escapeRegex(term), 'i');

    results = data.filter(function (agent) {
      return rx.test(agent.name) || rx.test(agent.company);
    });

    return new Promise(function(resolve, reject) {
      resolve(results);
    });
  },

  get : function (mode, filter) {
    var data = store.read().agents;

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