var React = require('react');

module.exports = React.createClass({
  render : function () {
    var errors, p = this.props;

    if(p.errors) {
      errors = p.errors.map(function (err, i) {
        return (<li key={i}>{err.message}</li>);
      });
    }

    if(errors) {
      return (
        <div>
          <ul>{errors}</ul>
        </div>
      );
    } else {
      return null;
    }
  }
});
