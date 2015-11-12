var React = require('react');

module.exports = React.createClass({
  render : function () {
    return (
    	<div>
    		<div className="menu">{this.props.menu}</div>
     		<div className="main">
     			{this.props.children}
     		</div>
     	</div>
    );
  }
});
