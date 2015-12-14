var Reflux = require('reflux');
var Proxy = require('./api/proxy.rest');

var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'find' : { children : ['completed', 'failed'] },
  'update' : { children : ['success', 'failed'] },
  'condition' : { children : ['success', 'failed'] },
  'loadSource' : { children : ['completed', 'failed'] }
});

Actions.find.listen(function(params) {
  Proxy.find(params)
    .then(this.completed, this.failed);
});

Actions.update.listen(function(data) {
  var errors = [];

  if(errors.length) {
    this.failed(data, errors);
  } else {
    Proxy.update(data)
      .then(this.success, this.failed);
  }
});

Actions.loadSource.listen(function(id) {
  Proxy.get(id)
    .then(this.completed, this.failed);
});

Actions.condition.listen(function(id, type) {
  Proxy.condition(id, type)
    .then(this.success, this.failed);
});

module.exports = Actions;