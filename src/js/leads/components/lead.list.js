var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var BasicList = require('../../shared/components/list'),
    leadsStore = require('../stores/leads'),
    actions = require('../actions');

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
    var List = BasicList(this.props.component);

    return (
      <List keyField="_id" itemName="lead" items={this.state.leads} />
    );
  }
});