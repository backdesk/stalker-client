var React = require('react'),
    Reflux = require('reflux'),
    FormError = require('../../shared/components/formError'),
    Layout = require('../../shared/components/layout');

var leadStore = require('../stores/lead'),
    actions = require('../actions');


var Lead = React.createClass({
  getInitialState : function () {
    return {
      details : '',
      description : '',
      status : ''
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
    var state = {}, name = e.target.getAttribute('name');

    state[name] = e.target.value;

    this.setState(state);
  },

  render : function () {
    var p = this.state;

    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create/Edit Lead</legend>

          <FormError errors={this.props.errors} />

          <label htmlFor="details">Details: </label>
          <input id="details" name="details" value={p.details} onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" value={p.description} />

          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={p.status}>
            <option value="junk">Junk</option>
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
          </select>
        </fieldset>
        <input type="submit" value="submit" className="pure-button pure-button-primary" />
      </form>
    );
  }
});

module.exports = React.createClass({
  mixins: [Reflux.connect(leadStore)],

  handleSubmit : function (data) {
    actions.update(data);
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