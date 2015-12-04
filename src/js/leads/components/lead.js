var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    moment = require('moment'),
    Layout = require('../../shared/components/layout');

var leadStore = require('../stores/lead'),
    activityStore = require('../stores/lead.activity'),
    FormContainer = require('../../shared/components/form.container'),
    utils = require('../../shared/utils'),
    actions = require('../actions');

var RANDOM_INTROS = [
  'A delectable bite',
  'A real treat',
  'A right meaty one',
  'A tasty morsel',
  'A joyful gift',
  'Something to savour',
  'A offering',
  'An absolute cracker',
  'Feast your eyes on this beauty'
];

var LeadSource = React.createClass({
  mixins : [Router.History],

  handleClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/sources/' + this.props.source._id);
  },

  render : function () {
    var intro = RANDOM_INTROS[Math.floor(Math.random() * RANDOM_INTROS.length)];

    if(!this.props.source) return null;

    return (
      <p className="lead-source">{intro} from <a href="#" onClick={this.handleClick}>{this.props.source.name}</a></p>
    );
  }
});

var LeadActivityForm = React.createClass({
  mixins: [Reflux.listenTo(activityStore, 'onActivityResult')],

  getInitialState : function () {
    return {
      comment : ''
    }
  },

  onActivityResult : function (data) {
    if (data.result) {
      if (data.result === 'success') {
        this.replaceState(this.getInitialState());
      }
    }
  },

  handleChange : function (e) {
    var el = e.target, value = utils.getInputValue(el);

    this.setState({
      comment : value
    });
  },

  handleSubmit : function (e) {
    e.preventDefault();

    actions.logActivity(this.props.leadId, {
      comment : this.state.comment
    });
  },

  render : function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" name="comment" value={this.state.comment} onChange={this.handleChange} className="activity-comment" />
        <input type="submit" value="Log Activity" className="pure-button pure-button-primary button-xsmall right" />
      </form>
    );
  }
});

var LeadActivityEntry = React.createClass({
  render : function () {
    var entry = this.props.entry;

    return (
      <div className="entry">
        <div className="tag">{entry.op}</div>
        <p className="comment">{entry.comment}</p>
        <div>
          <p className="meta">Created: {moment(entry.created).fromNow()}</p>
        </div>
      </div>
    );
  }
});

var LeadActivity = React.createClass({
  mixins: [Reflux.connect(activityStore)],

  render : function () {
    var activity = this.state.activity, nodes;

    if(activity && activity.length) {
      nodes = activity.map(function (entry) {
        return (
          <li key={entry._id}>
            <LeadActivityEntry entry={entry} />
          </li>
        );
      });
    }

    return (
      <div className="lead-activity">
        <h5 className="summary">This lead is <span className="status-flag">{this.props.status}</span>.</h5>
        <ul>
          {nodes}
        </ul>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(leadStore), Router.History],

  componentDidMount : function () {
    actions.loadLead(this.props.routeParams.id);
  },

  handleEditClick : function (e) {
    e.preventDefault();

    this.history.pushState(null, '/leads/edit/' + this.state.lead._id);
  },

  render : function () {
    var lead = this.state.lead;

    return (
      <Layout>
        <div>
          <h3>{lead.details}</h3>
          <div className="mini-nav right">
            <a href="#" className="edit-link" onClick={this.handleEditClick}>Edit Lead</a>
          </div>
        </div>
        <section>
          <LeadSource source={lead.source} />
          <p className="lead-desc">{lead.description}</p>
        </section>
        <section className="lead-activity-form">
          <LeadActivityForm leadId={lead._id} />
        </section>
        <section>
          <LeadActivity status={lead.status} />
        </section>
      </Layout>
    );
  }
});