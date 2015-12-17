var request = require('superagent'),
    _ = require('lodash');

var url = 'http://localhost:3333/sources/';

module.exports = {
  get : function (id) {
    return new Promise(function(resolve, reject) {
      request
        .get(url + id)
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  find : function (params) {
    var query = {};

    params = params || {};

    if(params.filter) {
      filter = filter.split(':');
      query[filter[0]] = filter[1];
    }

    if(params.name) {
      query.name = params.name;
    }

    if(params.mode) {
      if(params.mode === 'chase') {
        _.extend(query, { status : 'chasing', threshold : 'above' });
      } else if (params.mode === 'kicking') {
        _.extend(query, { status : 'waiting', threshold : 'above' });
      } else if (params.mode === 'zombies') {
        _.extend(query, { status : 'chasing', threshold : 'below' });
      }
    }

    return new Promise(function(resolve, reject) {
       request
        .get(url)
        .query(query)
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body.sources);
        });
    });
  },

  condition : function (id, type) {
    return new Promise(function(resolve, reject) {
      request
        .put(url + id + '/' + type)
        .end(function (err, res) {
          err ? reject(err) : resolve(type);
        })
    });
  },

  update : function (body) {
    return new Promise(function(resolve, reject) {
      request
        .put(url + body._id)
        .send(body)
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body);
        });
    });
  }
};