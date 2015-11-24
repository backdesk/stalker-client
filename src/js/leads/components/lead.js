var React = require('react'),
    Reflux = require('reflux'),
    FormError = require('../../shared/components/formError'),
    Layout = require('../../shared/components/layout');

var leadStore = require('../stores/lead'),
    update = require('react-addons-update'),
    utils = require('../../shared/utils'),
    actions = require('../actions');

var Lead = React.createClass({
  getInitialState : function () {
    return {
      details : '',
      description : '',
      status : '',
      source : {
        name : '',
        channel : ''
      }
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState(props.lead);
  },

  handleSubmit : function (e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
  },

  handleChange : function (e) {
    var state = {}, el = e.target, name = el.getAttribute('name');

    if(name === 'name' || name === 'channel') {
      state.source = {
        [name] : { $set : utils.getInputValue(el) }
      };
    } else {
      state[name] = { $set : utils.getInputValue(el) }
    }

    this.setState(update(this.state, state));
  },

  render : function () {
    var p = this.state;

    return (
      <form className="pure-form pure-form-stacked lead-editor" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create/Edit Lead</legend>

          <FormError errors={this.props.errors} />

          <label htmlFor="details">Details: </label>
          <input className="lead-details" id="details" name="details" value={p.details} onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" value={p.description} onChange={this.handleChange} />

          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={p.status} onChange={this.handleChange}>
            <option value="junk">Junk</option>
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
          </select>

          <label htmlFor="name">Origin: </label>
          <input id="name" name="name" value={p.source.name} onChange={this.handleChange} />

          <label htmlFor="channel">Channel:</label>
          <select id="channel" name="channel" value={p.source.channel} onChange={this.handleChange}>
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
        <Lead lead={this.state.lead} errors={this.state.errors} onSubmit={this.handleSubmit} />
      </Layout>
    );
  }
});