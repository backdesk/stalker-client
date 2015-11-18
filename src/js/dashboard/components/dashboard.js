var React = require('react');

var Layout = require('../../shared/components/layout'),
    Agents = require('../../agents/components/agents'),
    Leads  = require('../../leads/components/leads');

var Panel = React.createClass({
  render : function () {
    return (
      <section className="panel">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </section>
    );
  }
})

module.exports = React.createClass({
  render : function () {
    var agents = <Agents />;

    return (
      <Layout>
        <div className="dashboard">
          <Panel title="Fresh Donuts">
            <Leads filter="status:pending" />
          </Panel>
          <Panel title="Runners and Gunners">
            <Agents mode="chase" />
          </Panel>
        </div>
      </Layout>
    );
  }
});