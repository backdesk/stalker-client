var React = require('react'),
    ReactDom = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

var Header = require('./shared/components/header'),
    Sources = require('./sources/components/sources'),
    Source = require('./sources/components/source'),
    SourceEditor = require('./sources/components/source.editor'),
    Leads = require('./leads/components/leads'),
    Lead = require('./leads/components/lead'),
    LeadEditor = require('./leads/components/lead.editor'),
    Dashboard = require('./dashboard/components/dashboard');

var App = React.createClass({
  render: function() {
    return (
      <div id="content">
        <Header />
        {this.props.children}
      </div>
    );
  }
});

ReactDom.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="sources" component={Sources} />
      <Route path="sources/:id" component={Source} />
      <Route path="sources/edit/:id" component={SourceEditor} />

      <Route path="leads" component={Leads} />
      <Route path="leads/create" component={LeadEditor} />
      <Route path="leads/:id" component={Lead} />
      <Route path="leads/edit/:id" component={LeadEditor} />

    </Route>
  </Router>
), document.getElementById('main'));