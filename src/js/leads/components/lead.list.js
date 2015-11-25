var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var leadsStore = require('../stores/leads');
var actions = require('../actions');

var LeadList = function (ListItem) {
  return  React.createClass({
    mixins : [Router.History],

    handleCreate : function (e) {
      e.preventDefault();

      this.history.pushState(null, '/leads/create');
    },

    render : function () {
      var node, leadNodes =  this.props.leads.map(function (lead) {
        return (<ListItem key={lead._id} lead={lead} />)
      });

      if(!this.props.leads.length) {
        node = (<div className="lead-list">Nothing yet.</div>);
      } else {
        node = (<div className="lead-list">{leadNodes}</div>);
      }

      return (node);
    }
  });
};

/**
 * Filtering locally shouldn't really be necessary but there's a glitch in the way I am modifying
 * individual records and splurging state within the store.
 */
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
    var List = LeadList(this.props.item);

    return (
      <List leads={this.state.leads} />
    );
  }
});