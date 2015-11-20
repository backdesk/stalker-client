var Reflux = require('reflux');
var Proxy = require('./api/proxy');


var Actions = Reflux.createActions({
  'load' : { children : ['completed', 'failed'] },
  'loadLead' : { children : ['completed', 'failed'] },
  'dismiss' : { children : ['completed', 'failed'] },
  'update' : { children : ['success', 'failed'] },
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

Actions.update.listen(function(data) {
	var errors = [];

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


module.exports = Actions;