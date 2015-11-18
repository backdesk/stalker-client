var Reflux = require('reflux');
var Proxy = require('./api/proxy');

var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] }
});

Actions.load.listen(function(mode, filter) {
  Proxy.get(mode, filter)
    .then(this.completed, this.failed);
});

module.exports = Actions;