var Reflux = require('reflux');

var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] }
});

Actions.load.listen(function() { 
  this.completed(require('./api/mock'));
});

module.exports = Actions;