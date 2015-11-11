var React = require('react');
var ReactDom = require('react-dom');

var Agents = require('./agents/components/agents');

var Dashboard = require('./dashboard/components/dashboard');
var DashboardPanel = require('./dashboard/components/panel');

var App = React.createClass({
  render: function() {
    return (
    	<div>
	    	<h1>Welcome</h1>
	    	<Dashboard>
	     		<DashboardPanel title="Active Agents"><Agents /></DashboardPanel>
	    	</Dashboard>
	    </div>
    );
  }
});

ReactDom.render(<App />, document.getElementById('main'));
