var React = require('react'),
    Reflux = require('reflux'),
    Link = require('react-router').Link;

var LeadsStore = require('../stores/leads');
var Actions = require('../actions');

var LeadCard = React.createClass({
  render : function () {
    var p = this.props.item;

    return (
      <div className="lead-card">
        <Link to={`/leads/${p._id}`}>{p.details}</Link>
      </div>
    );
  }
});

var LeadList = React.createClass({
  render : function () {
    var p, items = [];

    for (var i in this.props.items) {
      p = this.props.items[i];
      items.push(<LeadCard key={i} item={p} />);
    }

    return (
      <div>
        {items}
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(LeadsStore)],

  componentDidMount : function () {
    Actions.load(this.props.filter);
  },

  render : function () {
    console.log(this.state);
    return (
      <LeadList items={this.state.leads} />
    );
  }
});