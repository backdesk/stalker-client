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
    var source = this.props.source;

    if(source.type === 'unknown') {
      return <small className="source">Unknown</small>
    }

    return (
      <small className="source">From <a href="#" onClick={this.handleClick}>{source.name} @ {source.company}</a> ({source.type}) via {this.props.channel}</small>
    );
  }
});

module.exports = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/leads/' + this.props.item._id);
  },

  handleDismiss : function (e) {
    e.preventDefault();

    this.setState({ status : 'junk' });

    actions.dismiss(this.props.item._id);
  },

  render : function () {
    var lead = this.props.item;

    return (
      <div className="lead-card">
        <header className="header">
          <a href="#" onClick={this.handleClick}>{lead.details}</a><span className="last-update">Last updated {moment(lead.updatedAt).fromNow()}</span>
        </header>
        <section className="info">
          <LeadSource source={lead.source} channel={lead.channel} />
          <a href="#" onClick={this.handleDismiss} className="dismiss button-xsmall pure-button">Dismiss</a>
        </section>
      </div>
    );
  }
});