var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var leadsStore = require('../stores/leads');
var actions = require('../actions');

var LeadCard = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    var lead = this.props.lead;

    e.preventDefault();

    this.history.pushState(null, '/leads/' + lead._id);
  },

  render : function () {
    var lead = this.props.lead;

    return (
      <div className="lead-card">
        <a href="#" onClick={this.handleClick}>{lead.details}</a>
      </div>
    );
  }
});

var LeadList = React.createClass({
  render : function () {
    var leadNodes =  this.props.leads.map(function (lead) {
      return <LeadCard key={lead._id} lead={lead} />
    });

    return (
      <div>
        {leadNodes}
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins : [Reflux.connect(leadsStore)],

  componentDidMount : function () {
    actions.load(this.props.filter);
  },

  render : function () {
    return (
      <LeadList leads={this.state.leads} />
    );
  }
});