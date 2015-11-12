var React = require('react');

module.exports = React.createClass({
  render : function () {
    return (
      <header id="head">
      	<h1>{this.props.title}</h1>
      </header>
    );
  }
});
