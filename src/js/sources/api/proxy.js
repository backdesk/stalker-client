var store = require('../../shared/store.local')(),
    utils = require('../../shared/utils'),
    moment = require('moment');

var ABYSS_THRESHOLD = 604800 * 2;

// Hack to mimic reference update on Mongo/Couch
var updateLeads = function (source) {
  var leads, data = localStorage.getItem('leads');

  if(data) {
    data = JSON.parse(data);

    leads = data.leads.map(function (lead) {
      if(lead.source._id === source._id) {
        lead.source.name = source.name;
        lead.source.company = source.company;
      }

      return lead;
    });

    localStorage.setItem('leads', JSON.stringify({ leads : leads }));
  }
};

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

      } else if (mode === 'zombies' || mode === 'kicking') {
        data = data.filter(function (source) {
          var timeElapsed = moment().diff(moment(source.lastContact), 'seconds');

          if(mode === 'kicking') {
            return timeElapsed < ABYSS_THRESHOLD && source.status === 'waiting';
          } else {
            return timeElapsed > ABYSS_THRESHOLD && source.status === 'chasing';
          }
        });
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
      } else if (filter[0] === 'company') {
        data = data.filter(function (source) {
          return source.company === filter[1];
        });
      }
    }

    return new Promise(function(resolve, reject) {
      resolve(data);
    });
  },

  create : function (source) {
    var data = store.read();

    source._id = utils.genObjId();

    data.sources.push(source);
    store.save(data);

    return new Promise(function(resolve, reject) {
      resolve(source);
    });
  },

  update : function (source) {
    var updated = false, index, data = store.read();

    data.sources = data.sources.map(function (item) {
      if(item._id === source._id) {
        return source;
      }

      return item;
    });

    store.save(data);

    updateLeads(source);

    return new Promise(function(resolve, reject) {
      resolve(source);
    });
  }
};