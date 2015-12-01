var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router');

var Layout = require('../../shared/components/layout'),
    SourceItem = require('./source.item'),
    SourceList = require('./source.list');


module.exports = React.createClass({
  resolveFilter : function () {
    var p = this.props, params, filter = p.filter;

    console.log(p);
    if(!filter) {
      params = Object.keys(p.routeParams);

      if(params.length) {
        filter = params[0] + ':' + p.routeParams[params[0]];
      }
    }

    return filter;
  },

  render : function () {
    var filter = this.resolveFilter();

    console.log(filter);

    return (
      <Layout>
        <h3>Sources</h3>
        <SourceList filter={filter} component={SourceItem} />
      </Layout>
    );
  }
});
