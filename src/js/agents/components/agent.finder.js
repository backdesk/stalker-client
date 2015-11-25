var React = require('react'),
    update = require('react-addons-update'),
		Reflux = require('reflux');

var agentsStore = require('../stores/agents'),
    actions = require('../actions'),
	  utils = require('../../shared/utils');

var TERM_THRESHOLD = 3;

var ResultItem = React.createClass({
  handleClick : function (e) {
    this.props.onSelect(this.props.agent);
  },

  render : function () {
    var p = this.props.agent;

    return (
      <li className="agent-item">
        <p onClick={this.handleClick}>{p.name} @ {p.company}</p>
      </li>
    );
  }
});

var ResultList = React.createClass({
  render : function () {
    var nodes, p = this.props;

    nodes = p.results.map(function (result) {
      return (
        <ResultItem onSelect={p.onSelect} agent={result} key={result._id}  />
      );
    });

    return (
      <ul>{nodes}</ul>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(agentsStore)],

  getInitialState : function () {
    return {
      name : ''
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState({ name : props.name });
  },

  resetResults : function () {
    this.setState(update(this.state, {
      agents : { $set : [] }
    }));
  },

  handleSelect : function (agent) {
    this.props.onSelect(agent);
    this.resetResults();
  },

  handleChange : function (e) {
  	var el = e.target, term = utils.getInputValue(el);

  	if(term && term.trim().length >= TERM_THRESHOLD) {
      actions.find(term);
  	} else {
      this.resetResults();
    }

    this.setState(update(this.state, { name : { $set : term } }));
  },

  render : function () {
    return (
      <div>
        <ResultList results={this.state.agents} onSelect={this.handleSelect} />
        <input value={this.state.name} id="name" name="name" onChange={this.handleChange} />
      </div>
    );
  }
});