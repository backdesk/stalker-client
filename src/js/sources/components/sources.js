var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var Layout = require('../../shared/components/layout'),
    utils = require('../../shared/utils'),
    SourceItem = require('./source.item'),
    SourceList = require('./source.list');

var ModalMessages = {
  'chase'   : 'These sources have unresolved leads and have yet to return with feedback.',
  'kicking' : 'These sources have unresolved leads and are waiting for your response.',
  'zombies' : 'These sources have unresolved leads but have mysteriously vanished.'
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
    }, this);

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
