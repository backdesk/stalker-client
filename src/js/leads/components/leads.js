var React = require('react');
var Reflux = require('reflux');
var m = require('moment');


var LeadsStore = require('../stores/leads');
var Actions = require('../actions');

var LeadCard = React.createClass({
  render : function () {
    var p = this.props.item;

    return (
      <div>        
        <h4>{p.details}</h4>
        <p>
          <strong>Status: </strong>{p.status} - {m(p.lastUpdate).format('ddd Do MMM YYYY')} ({m(p.lastUpdate).fromNow()}) 
        </p>
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
    return (
      <LeadList items={this.state.leads} />
    );
  }
});