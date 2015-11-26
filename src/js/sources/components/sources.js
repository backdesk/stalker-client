var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    moment = require('moment');

var sourcesStore = require('../stores/sources'),
    actions = require('../actions');


var SourceItem = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/sources/' + this.props.source._id);
  },

  render : function () {
    var p = this.props.source;

    return (
      <li className="source-item">
        <a href="#" onClick={this.handleClick}>{p.name} @ {p.company} - {moment(p.lastContact).fromNow()}</a>
      </li>
    );
  }
});

var SourceList = React.createClass({
  render : function () {
    var sourceNodes =  this.props.sources.map(function (source) {
      return <SourceItem key={source._id} source={source} />
    });

    return (
      <ul>
        {sourceNodes}
      </ul>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(sourcesStore)],

  componentDidMount : function () {
    actions.load(this.props.mode, this.props.filter);
  },

  render : function () {
    return (
      <SourceList sources={this.state.sources} />
    );
  }
});
