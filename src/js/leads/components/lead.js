var React = require('react'),
    Reflux = require('reflux');

var LeadStore = require('../stores/lead'),
    Actions = require('../actions');

var Lead = React.createClass({
  render : function () {
    var p = this.props.lead;

    // ARGH. This won't work. Since render is being called twice.
    return (
      <h2>{p.details}</h2>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(LeadStore)],

  componentDidMount : function () {
    Actions.loadLead(this.props.params.id);
  },

  render : function () {
    return (
      <Lead lead={this.state.lead} />
    );
  }
});