var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var Layout = require('../../shared/components/layout'),
    utils = require('../../shared/utils'),
    SourceItem = require('./source.item'),
    SourceList = require('./source.list');

var ModalMessages = {
  'chase'   : 'Sources with outstanding leads who have yet to return with feedback',
  'kicking' : 'Sources with outstanding leads who are waiting for my response.',
  'zombies' : 'Sources with outstanding leads but have not bothered to get back in touch.'
};

var SourceMessage = React.createClass({
  render : function () {
    var p = this.props, message = ModalMessages[p.mode];

    return (
      <p>{message}</p>
    );
  }
});

var SourceFilter = React.createClass({
  getInitialState : function () {
    return {
      mode : null
    }
  },

  handleModeChange : function (e) {
    var el = e.target, value = utils.getInputValue(el);

    this.setState({ mode : value });
  },

  render : function () {
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, { mode : this.state.mode });
    }.bind(this));

    return (
      <div>
        <h3>Sources</h3>
        <div className="source-mode">
          Show:
          <select onChange={this.handleModeChange}>
            <option>All</option>
            <option value="chase">Chasing</option>
            <option value="kicking">Still Kicking</option>
            <option value="zombies">Zombies</option>
          </select>
        </div>
        <SourceMessage mode={this.state.mode} />
        {children}
      </div>
    );
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <Layout>
        <SourceFilter>
          <SourceList component={SourceItem} />
        </SourceFilter>
      </Layout>
    );
  }
});
