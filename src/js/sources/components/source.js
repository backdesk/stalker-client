var React = require('react'),
		Reflux = require('reflux'),
    Router = require('react-router'),
    update = require('react-addons-update'),
    FormContainer = require('../../shared/components/form.container'),
	  Layout = require('../../shared/components/layout');

var sourceStore = require('../stores/source'),
    utils = require('../../shared/utils'),
		actions = require('../actions');

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
  	return (
  		<Layout>
          <div className="source-vitals">
            <h3>Vitals for {this.state.source.name} </h3>
            <div className="mini-nav right">
              <a href="#" className="edit-link" onClick={this.handleEditClick}>Edit Details</a>
            </div>
            <SourceVitals source={this.state.source} />
          </div>
  		</Layout>
  	);
  }
});