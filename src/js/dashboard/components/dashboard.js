var React = require('react');

var Layout = require('../../shared/components/layout'),
    SourceList = require('../../sources/components/source.list'),
    SourceItem = require('../../sources/components/source.item'),
    LeadList  = require('../../leads/components/lead.list'),
    LeadCard  = require('../../leads/components/lead.card'),
    Link = require('react-router').Link;

var Panel = React.createClass({
  render : function () {
    return (
      <section className="panel">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </section>
    );
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <Layout>
        <div className="dashboard">
          <Panel title="Fresh Donuts">
            <div className="mini-nav right">
                <Link to="/leads/create">Create</Link>
                <Link to="/leads">View All</Link>
            </div>
            <LeadList component={LeadCard} filter="status:pending" empty="Moar donutz pls." />
          </Panel>
          <Panel title="Runners and Gunners">
            <SourceList component={SourceItem} mode="chase" empty="Looks like they got away."/>
          </Panel>
        </div>
      </Layout>
    );
  }
});