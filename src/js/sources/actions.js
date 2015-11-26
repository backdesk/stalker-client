var Reflux = require('reflux');
var Proxy = require('./api/proxy');

var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'find' : { children : ['completed', 'failed'] },
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

Actions.loadSource.listen(function(id) {
  Proxy.getById(id)
    .then(this.completed, this.failed);
});


module.exports = Actions;