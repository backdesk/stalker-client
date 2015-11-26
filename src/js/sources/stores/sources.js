var Reflux = require('reflux');

module.exports = Reflux.createStore({
	listenables : require('../actions'),

	getInitialState : function () {
		return { sources : [] }
	},

	onLoadCompleted : function (sources) {
		this.trigger({ sources : sources });
	},

	onFindCompleted : function (sources) {
		this.trigger({ sources : sources });
	}
});