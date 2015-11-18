var Reflux = require('reflux');
var Proxy = require('./api/proxy');


var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'loadLead' : { children : ['completed', 'failed'] },
  'dismiss' : { children : ['completed', 'failed'] },
});

Actions.load.listen(function(filter) {
  Proxy.get(filter)
    .then(this.completed, this.failed);
});

Actions.loadLead.listen(function(id) {
  Proxy.getById(id)
    .then(this.completed, this.failed);
});

Actions.dismiss.listen(function(id) {
  Proxy.dismiss(id)
    .then(this.completed, this.failed);
});


module.exports = Actions;