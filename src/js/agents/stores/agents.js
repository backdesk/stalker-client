var Reflux = require('reflux');

module.exports = Reflux.createStore({
	listenables : require('../actions'),

	getInitialState : function () {
		return { agents : [] }
	},

	onLoadCompleted : function (agents) {
		this.trigger({ agents : agents });
	},

	onFindCompleted : function (agents) {
		this.trigger({ agents : agents });
	}
});