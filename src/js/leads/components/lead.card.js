var React = require('react'),
    Reflux = require('reflux'),
    moment = require('moment'),
    Router = require('react-router');

var actions = require('../actions');

var LeadSource = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/sources/' + this.props.source._id);
  },

  render : function () {
    var p = this.props.source;

    if(p.type === 'unknown') {
      return <small className="source">Unknown</small>
    }

    return (
      <small className="source">From <a href="#" onClick={this.handleClick}>{p.name} @ {p.company}</a> ({p.type}) via {p.channel}</small>
    );
  }
});

module.exports = React.createClass({
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
          <LeadSource source={this.props.lead.source} />
          <a href="#" onClick={this.handleDismiss} className="dismiss button-xsmall pure-button">Dismiss</a>
        </section>
      </div>
    );
  }
});