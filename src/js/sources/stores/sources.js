var Reflux = require('reflux');

module.exports = Reflux.createStore({
	listenables : require('../actions'),

	getInitialState : function () {
		return { sources : [], mode : null }
	},

	onFindCompleted : function (sources) {
		this.trigger({ sources : sources });
	}
});