var React = require('react'),
    Reflux = require('reflux'),
    update = require('react-addons-update'),
    classNames = require('classnames'),
    Layout = require('../../shared/components/layout'),
    SourceFinder = require('../../sources/components/source.finder'),
    TagEditor = require('./lead.tags'),
    FormError = require('../../shared/components/form.error'),
    FormContainer = require('../../shared/components/form.container');

var leadStore = require('../stores/lead'),
    utils = require('../../shared/utils'),
    actions = require('../actions');

var LeadForm = React.createClass({
  getInitialState : function () {
    return {
      lead : {
        details : '',
        description : '',
        status : '',
        source : {
          name : '',
          company : '',
          _id : null
        },
        status : 'junk',
        channel : 'web',
        tags : [],

      },
      result : null
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState(update(this.state, {
      lead : { $set : props.lead }
    }));
  },

  handleSubmit : function (e) {
    e.preventDefault();

    this.props.onSubmit(this.state.lead);
  },

  handleChange : function (e) {
    var state = {}, el = e.target, name = el.getAttribute('name');

    if(name === 'name') {
      state.source = {
        [name] : { $set : utils.getInputValue(el) }
      };
    } else {
      state[name] = { $set : utils.getInputValue(el) }
    }

    this.setState({ lead : update(this.state.lead, state) });
  },

  handleSourceChange : function (agent) {
    this.setState({
      lead : update(this.state.lead, {
        source : {
          name : { $set : agent.name },
          company : { $set : agent.company },
          _id : { $set : agent._id }
        }
      })
    });
  },

  handleTagChange : function (tags) {
    this.setState(
      update(this.state, { lead : { tags : { $set : tags } } })
    );
  },

  render : function () {
    var lead = this.state.lead;

    return (
      <form className="pure-form pure-form-stacked lead-editor" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create/Edit Lead</legend>

          <FormError errors={this.props.errors} />

          <label htmlFor="details">Details: </label>
          <input className="lead-details" id="details" name="details" value={lead.details} onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" value={lead.description} onChange={this.handleChange} />

          <TagEditor tags={lead.tags} onTagChange={this.handleTagChange} />

          <label htmlFor="status">Status:</label>
          <select id="status" name="status" className="lead-status" value={lead.status} onChange={this.handleChange}>
            <option value="junk">Junk</option>
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
          </select>

          <label htmlFor="name">Source: </label>
          <SourceFinder name={lead.source.name} onSelect={this.handleSourceChange} />

          <label htmlFor="channel">Channel:</label>
          <select id="channel" name="channel" value={lead.channel} onChange={this.handleChange}>
            <option value="email">Email</option>
            <option value="web">Web</option>
            <option value="phone">Phone</option>
            <option value="manual">Manual</option>
          </select>
        </fieldset>

        <hr />

        <input type="submit" value="Save Lead" className="pure-button pure-button-primary button-large right" />
      </form>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(leadStore)],

  handleSubmit : function (data) {
    // this.setState(update(this.state, { pending : { $set : true } }));

    if(this.props.routeParams.id) {
      actions.update(data);
    } else {
      actions.create(data);
    }
  },

  componentDidMount : function () {
    if(this.props.routeParams.id) {
      actions.loadLead(this.props.routeParams.id);
    }
  },

  render : function () {
    return (
      <Layout>
        <FormContainer result={this.state.result} pending={this.state.pending}>
          <LeadForm lead={this.state.lead} errors={this.state.errors} onSubmit={this.handleSubmit} />
        </FormContainer>
      </Layout>
    );
  }
});