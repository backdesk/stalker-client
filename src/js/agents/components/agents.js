var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');


var AgentsStore = require('../stores/agents');
var Actions = require('../actions');


var AgentItem = React.createClass({
  render : function () {
    var p = this.props.agent;

    return (
      <li className="agent-item">
        <p>{p.name} @ {p.company} - {moment(p.lastContact).fromNow()}</p>
      </li>
    );
  }
});

var AgentList = React.createClass({
  render : function () {
    var agentNodes =  this.props.agents.map(function (agent) {
      return <AgentItem key={agent._id} agent={agent} />
    });

    return (
      <ul>
        {agentNodes}
      </ul>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(AgentsStore)],

  componentDidMount : function () {
    Actions.load(this.props.mode, this.props.filter);
  },

  render : function () {
    return (
      <AgentList agents={this.state.agents} />
    );
  }
});
