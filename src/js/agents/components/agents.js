var React = require('react');
var Reflux = require('reflux');


var AgentsStore = require('../stores/agents');
var Actions = require('../actions');


var AgentItem = React.createClass({
  render : function () {
    var p = this.props.item;

    return (
      <li class="agent-item">
        <p>{p.name} @ {p.company}</p>
        <p className="rank">Rank not calculated</p>
      </li>
    );
  }
});

var AgentList = React.createClass({
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

  componentDidMount : function () {
    Actions.load();
  },

  render : function () {
    return (
      <AgentList items={this.state.agents} />
    );
  }
});
