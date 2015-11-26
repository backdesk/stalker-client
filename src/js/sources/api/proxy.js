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

store.init('sources', require('./mock.json'));

module.exports = {
  getById : function (id) {
    var data = store.find(id, 'sources');

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

  find : function (term) {
    var rx, data = store.read().sources, results = [];

    rx = new RegExp('^' + utils.escapeRegex(term), 'i');

    results = data.filter(function (source) {
      return rx.test(source.name) || rx.test(source.company);
    });

    return new Promise(function(resolve, reject) {
      resolve(results);
    });
  },

  get : function (mode, filter) {
    var data = store.read().sources;

    if(mode) {
      if(mode === 'chase') {
        data = data.filter(function (source) {
          var timeElapsed = moment().diff(moment(source.lastContact), 'seconds');

          return source.status === 'chasing' && timeElapsed < ABYSS_THRESHOLD;
        });

        sortByLastContact(data);
      }
    } else {
      sortByName(data);
    }

    if(filter) {
      filter = filter.split(':');

      if(filter[0] === 'status') {
        data = data.filter(function (source) {
          return source.status === filter[1];
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