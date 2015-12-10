var Reflux = require('reflux');
var Proxy = require('./api/proxy.rest');


var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'loadLead' : { children : ['completed', 'failed'] },
  'dismiss' : { children : ['completed', 'failed'] },
  'update' : { children : ['success', 'failed'] },
  'create' : { children : ['success', 'failed'] },
  'logActivity' : { children : ['success', 'failed'] }
});

Actions.load.listen(function(filter) {
  Proxy.find(filter)
    .then(this.completed, this.failed);
});

Actions.loadLead.listen(function(id) {
  Proxy.get(id)
    .then(this.completed, this.failed);
});

Actions.dismiss.listen(function(id) {
  Proxy.dismiss(id)
    .then(this.completed, this.failed);
});

// TODO: Merge with update now I know what I'm doing :)
Actions.create.listen(function(data) {
  var errors = [];

  // TODO: Move to object validator.
  if(data.details.trim().length === 0){
    errors.push({ message : 'Details cannot be empty.' });
  }

  if(errors.length) {
    this.failed(data, errors);
  } else {
    Proxy.create(data)
      .then(this.success, this.failed);
  }
});

Actions.update.listen(function(data) {
  var errors = [];

  // TODO: Move to object validator.
  if(data.details.trim().length === 0){
    errors.push({ message : 'Details cannot be empty.' });
  }

  if(errors.length) {
    this.failed(data, errors);
  } else {
    Proxy.update(data)
      .then(this.success, this.failed);
  }
});

Actions.logActivity.listen(function(id, data) {
  Proxy.logActivity(id, data)
    .then(this.success, this.failed);
});

module.exports = Actions;