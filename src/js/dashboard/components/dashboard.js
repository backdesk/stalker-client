var React = require('react');

module.exports = React.createClass({
	render : function () {
		return (
			<div id="dashboard">
				{this.props.children}
			</div>
		);
	}
});