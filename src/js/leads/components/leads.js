var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var leadsStore = require('../stores/leads');
var actions = require('../actions');
var moment = require('moment');

var LeadCard = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/leads/' + this.props.lead._id);
  },

  handleDismiss : function (e) {
    e.preventDefault();

    actions.dismiss(this.props.lead._id);
  },

  render : function () {
    var lead = this.props.lead;

    return (
      <div className="lead-card">
        <header className="header">
          <a href="#" onClick={this.handleClick}>{lead.details}</a><span className="last-update">Last updated {moment(lead.lastUpdate).fromNow()}</span>
        </header>
        <section className="info">
          <small className="source">From <a href="#">{lead.source.name} @ {lead.source.company}</a> ({lead.source.type}) via {lead.source.channel}</small>
          <a href="#" onClick={this.handleDismiss} className="dismiss button-xsmall pure-button">Dismiss</a>
        </section>
      </div>
    );
  }
});

var LeadList = React.createClass({
  mixins : [Router.History],

  handleCreate : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/leads/create');
  },

  render : function () {
    var node, leadNodes =  this.props.leads.map(function (lead) {
      return <LeadCard key={lead._id} lead={lead} />
    });

    if(!this.props.leads.length) {
      node = (<div>Nothing yet. <a href='#' onClick={this.handleCreate}>Create Lead</a></div>);
    } else {
      node = (<div>{leadNodes}</div>);
    }

    return (node);
  }
});

module.exports = React.createClass({
  mixins : [Reflux.connectFilter(leadsStore, 'leads', function(data) {
    var filter = this.props.filter;

    if (filter) {
      var f = filter = filter.split(':');

      return data.leads.filter(function (lead) {
        return lead[f[0]] === f[1];
      });
    } else {
      return data.leads;
    }
  })],

  componentDidMount : function () {
    actions.load(this.props.filter);
  },

  render : function () {
    return (
      <LeadList leads={this.state.leads} />
    );
  }
});