var Reflux = require('reflux');
var Proxy = require('./api/proxy');

var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'find' : { children : ['completed', 'failed'] },
  'update' : { children : ['success', 'failed'] },
  'loadSource' : { children : ['completed', 'failed'] }
});

Actions.load.listen(function(mode, filter) {
  Proxy.get(mode, filter)
    .then(this.completed, this.failed);
});

Actions.find.listen(function(term) {
  Proxy.find(term)
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
  Proxy.getById(id)
    .then(this.completed, this.failed);
});


module.exports = Actions;