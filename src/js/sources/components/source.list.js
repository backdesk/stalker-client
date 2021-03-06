var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    moment = require('moment');

var BasicList = require('../../shared/components/list'),
    sourcesStore = require('../stores/sources'),
    actions = require('../actions');

module.exports = React.createClass({
  mixins : [Reflux.connect(sourcesStore)],

  componentDidMount : function () {
    actions.find({ mode: this.props.mode, filter : this.props.filter});
  },

  componentWillReceiveProps : function (props) {
    actions.find({ mode: props.mode, filter : props.filter});
  },

  render : function () {
    var List = BasicList(this.props.component);

    return (
      <List keyField="_id" items={this.state.sources} />
    );
  }
});