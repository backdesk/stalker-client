var React = require('react'),
    Reflux = require('reflux');

var leadStore = require('../stores/lead'),
    actions = require('../actions');

var Lead = React.createClass({
  render : function () {
    var p = this.props.lead;

    return (
      <div>
        <h2>{p.details}</h2>
        <p>{p.description}</p>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(leadStore)],

  componentDidMount : function () {
    actions.loadLead(this.props.routeParams.id);
  },

  render : function () {
    if (!this.state.lead) {
      return (
        <Lead lead={this.state.lead} />
      );
    }

    return (
      <div>Loading</div>
    );
  }
});