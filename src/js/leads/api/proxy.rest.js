var request = require('superagent');

var url = 'http://localhost:3333/leads/';

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

  find : function (filter) {
    var query = {};

    if(filter) {
      filter = filter.split(':');

      query[filter[0]] = filter[1];
    }

    return new Promise(function(resolve, reject) {
      request
        .get(url)
        .query(query)
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body.leads);
        });
    });
  },

  logActivity : function (id, activity) {
    activity.op = 'manual';

    return new Promise(function(resolve, reject) {
      request
        .post(url + id + '/activity')
        .send(activity)
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  getActivity : function (id, skip) {
    return new Promise(function(resolve, reject) {
      request
        .get(url + id + '/activity')
        .query({ skip : skip })
        .end(function (err, res) {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  dismiss : function (id) {
    return new Promise(function(resolve, reject) {
      request
        .put(url + 'dismiss')
        .send({ id : id })
        .end(function (err, res) {
          err ? reject(err) : resolve(id);
        });
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