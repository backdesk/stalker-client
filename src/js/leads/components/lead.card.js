var React = require('react'),
    Reflux = require('reflux'),
    moment = require('moment'),
    Router = require('react-router');

var actions = require('../actions');

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
          <small className="source">From <a href="#">{lead.source.name} @ {lead.source.company}</a> ({lead.source.type}) via {lead.source.channel}</small>
          <a href="#" onClick={this.handleDismiss} className="dismiss button-xsmall pure-button">Dismiss</a>
        </section>
      </div>
    );
  }
});