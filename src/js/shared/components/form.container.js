var React = require('react');
var classNames = require('classnames');

var FormResult = React.createClass({
  render : function () {
    if(!this.props.result) return null;

    return (
      <div>{this.props.result}</div>
    );
  }
});

module.exports = React.createClass({
  render : function () {
    var classes = classNames({
      'form-container' : true,
      'pending': this.props.pending
    });

    return (
      <div className={classes}>
        <FormResult result={this.props.result} />
        {this.props.children}
      </div>
    )
  }
});
