var React = require('react');

module.exports = React.createClass({
  render : function () {
    return (
      <section>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </section>
    );
  }
})
