var React = require('react');

var FormResult = React.createClass({
  render : function () {
    var msgClass;

    if(this.props.result) {
      msgClass = (this.props.result === 'success') ? 'msg-success' : 'msg-failure';
    } else {
      return null;
    }

    return (
      <div className={msgClass}>{this.props.messages[this.props.result]}</div>
    );
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <div className="form-container">
        <FormResult result={this.props.result} messages={this.props.messages} />
        {this.props.children}
      </div>
    )
  }
});
