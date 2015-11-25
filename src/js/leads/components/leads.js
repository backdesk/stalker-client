var React = require('react');

var Layout = require('../../shared/components/layout'),
    LeadList  = require('../../leads/components/lead.list'),
    LeadCard  = require('../../leads/components/lead.card');

module.exports = React.createClass({
  render : function () {
    return (
      <Layout>
        <LeadList item={LeadCard} />
      </Layout>
    );
  }
});