var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    Layout = require('../../shared/components/layout');

var sourceStore = require('../stores/source'),
    actions = require('../actions');

var SourceHeader = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();
  },

  render : function () {
    var source = this.props.source, node;

    if(source.company) {
      node = <h3>{source.name}  @ <a href="#" onClick={this.handleClick} className="by-company">{source.company}</a></h3>;
    } else {
      node = <h3>source.name</h3>;
    }

    return (node);
  }
})

var SourceVitals = React.createClass({
  render : function () {
    var p = this.props.source;

    return (
      <div className="pure-g">
          <div className="overview pure-u-1">Last heard from many moons ago</div>
          <div className="column pure-u-1-4">
            <span className="atom">234</span>
            <span className="atom-name">Flimper Scampers</span>
          </div>
          <div className="column pure-u-1-4">
            <span className="atom">12</span>
            <span className="atom-name">Tamborine Salesmen</span>
          </div>
          <div className="column pure-u-1-4">
            <span className="atom">90</span>
            <span className="atom-name">Failed Attempts at Humanity</span>
          </div>
          <div className="column pure-u-1-4">
            <span className="rank">Useless</span>
          </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(sourceStore), Router.History],

  componentDidMount : function () {
    actions.loadSource(this.props.routeParams.id);
  },

  handleEditClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/sources/edit/' + this.state.source._id);
  },

  render : function () {
    var source = this.state.source;

    return (
      <Layout>
          <div className="source-vitals">
            <SourceHeader source={source} />
            <div className="mini-nav right">
              <a href="#" className="edit-link" onClick={this.handleEditClick}>Edit Details</a>
            </div>
            <SourceVitals source={source} />
          </div>
      </Layout>
    );
  }
});