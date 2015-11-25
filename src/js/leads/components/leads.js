var React = require('react'),
    moment = require('moment'),
    Router = require('react-router');

var Layout = require('../../shared/components/layout'),
    LeadList  = require('../../leads/components/lead.list'),
    LeadCard  = require('../../leads/components/lead.card');

var utils = require('../../shared/utils');


var LeadActionButton = React.createClass({
  handleChange : function (e) {
    var el = e.target;

    console.log(utils.getInputValue(el));
  },

  render : function () {
    return (
      <span className="lead-action">
        Set status:&nbsp;
        <select onChange={this.handleChange} value={this.props.status}>
          <option>Choose a status</option>
          <option value="pending">Pending</option>
          <option value="applied">Applied</option>
          <option value="junk">Junk</option>
        </select>
      </span>
    )
  }
});

var LeadItem = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/leads/' + this.props.lead._id);
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
          <LeadActionButton status={lead.status} />
        </section>
      </div>
    );
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <Layout>
        <LeadList item={LeadItem} />
      </Layout>
    );
  }
});