var React = require('react'),
    Reflux = require('reflux'),
    moment = require('moment'),
    Router = require('react-router'),
    Layout = require('../../shared/components/layout');

var sourceStore = require('../stores/source'),
    actions = require('../actions');

var RANDOM_MEASURES = [
  'Last seen during the late heavy bombardment',
  'Last seen stroking sauropods',
  'Last seen many moons ago'
];

var SourceConditioner = React.createClass({
  getInitialState : function () {
    return {
      scratches : 0,
      tickles : 0
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState({
      scratches : props.source.scratches,
      tickles : props.source.tickles
    })
  },

  handleClick : function (e) {
    e.preventDefault();

    var type = e.currentTarget.value;

    actions.condition(this.props.source._id, type);
  },

  render : function () {
    return (
      <div className="source-conditioner">
        <button value="tickles" className="button-xsmall pure-button" onClick={this.handleClick}> ({this.state.tickles}) Tickle</button>
        <button value="scratches" className="button-xsmall pure-button" onClick={this.handleClick}>({this.state.scratches}) Scratch</button>
      </div>
    )
  }
});

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
      node = <h3>{source.name}</h3>;
    }

    return (node);
  }
})

var SourceVitals = React.createClass({
  render : function () {
    var timeAgo, m, source = this.props.source;

    m = moment(source.lastContactAt);
    if (moment().diff(m, 'days') > 30 ) {
      timeAgo = RANDOM_MEASURES[Math.floor(Math.random() * RANDOM_MEASURES.length)];
    } else {
      timeAgo = 'Last heard from ' + m.fromNow();
    }

    return (
      <div className="pure-g">
          <div className="overview pure-u-1">{timeAgo}</div>
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
            <SourceConditioner source={source} />
          </div>
      </Layout>
    );
  }
});