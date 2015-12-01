
var React = require('react'),
    moment = require('moment'),
    Router = require('react-router');

module.exports = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/sources/' + this.props.item._id);
  },

  render : function () {
    var p = this.props.item;

    return (
      <li className="source-item">
        <a href="#" onClick={this.handleClick}>{p.name} @ {p.company} - {moment(p.lastContact).fromNow()}</a>
      </li>
    );
  }
});