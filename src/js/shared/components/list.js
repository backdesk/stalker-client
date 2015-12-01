var React = require('react');

module.exports = function(ListItem) {
  return React.createClass({
    render : function () {
      var p = this.props, node, nodes;

      nodes = p.items.map(function (item) {
        return (<ListItem key={item[p.keyField]} item={item} />);
      });

      if(!p.items.length) {
        node = (<div className="source-list">{p.empty}</div>);
      } else {
        node = (<div className="source-list">{nodes}</div>);
      }

      return (node);
    }
  })
}
