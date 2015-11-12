var React = require('react'),
    ReactDom = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link;

var Header = require('./shared/components/header'),
    Agents = require('./agents/components/agents'),
    Leads = require('./leads/components/leads'),
    Lead = require('./leads/components/lead'),
    Dashboard = require('./dashboard/components/dashboard');

var App = React.createClass({
  render: function() {
    return (
      <div id="content">
        <Header title="Persistent Title" />
        {this.props.children}
      </div>
    );
  }
});

ReactDom.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="leads/:id" component={Lead} />
    </Route>
  </Router>
), document.getElementById('main'));