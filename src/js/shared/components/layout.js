var React = require('react');

module.exports = React.createClass({
  render : function () {
    return (
    	<div className="pure-g">
    		<div className="sidebar pure-u-1 pure-u-md-1-4">
                {this.props.menu}
            </div>
     		<div className="content pure-u-1 pure-u-md-3-4">
     			{this.props.children}
     		</div>
        </div>
    );
  }
});
