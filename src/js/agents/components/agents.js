var React = require('react');
var Reflux = require('reflux');


var AgentsStore = require('../stores/agents');
var Actions = require('../actions');


var AgentItem = React.createClass({
	handleClick : function (e) {
		e.preventDefault();
	},

	render : function () {
		var p = this.props.item;

		return (
			<li>				
				<h4><a href="#" onClick={this.handleClick}>{p.name}</a></h4>
				<p>{p.company}</p>
			</li>
		);
	}
});

var AgentList = React.createClass({
	componentDidMount : function () {
		Actions.load();
	},

	render : function () {
		var p, items = [];

    for (var i in this.props.items) {
      p = this.props.items[i];
      items.push(<AgentItem key={i} item={p} />);
    }
		
		return (
			<ul>
				{items}
			</ul>
		);
	}
});

module.exports = React.createClass({ 
	mixins: [Reflux.connect(AgentsStore)],

	render : function () {
		return (
			<AgentList items={this.state.agents} />
		);
	}
});
