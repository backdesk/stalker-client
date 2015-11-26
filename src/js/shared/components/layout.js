var React = require('react');

module.exports = React.createClass({
  render : function () {
    return (
    	<div className="pure-g">
    		<div className="sidebar pure-u-1 pure-u-md-1-4">
          <div>
            <h5>Zombie Alert!</h5>
            <p>Trent Lamebars has risen from the dead!</p>
          </div>
          {this.props.menu}
        </div>
   		  <div className="content pure-u-1 pure-u-md-3-4">
          {this.props.children}
   		  </div>
      </div>
    );
  }
});
