var React = require('react'),
		Reflux = require('reflux'),
    update = require('react-addons-update'),
    FormContainer = require('../../shared/components/form.container'),
	  Layout = require('../../shared/components/layout');

var sourceStore = require('../stores/source'),
    utils = require('../../shared/utils'),
		actions = require('../actions');

var SourceForm = React.createClass({
	getInitialState : function () {
    return {
      source : {
        name : '',
        company : '',
        type : '',
        status : '',
        notes : '',
        stats : null
      }
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState(update(this.state, {
      source : { $set : props.source }
    }));
  },

  handleSubmit : function (e) {
    e.preventDefault();

    this.props.onSubmit(this.state.source);
  },

  handleChange : function (e) {
    var state = {}, el = e.target, name = el.getAttribute('name');

    state[name] = { $set : utils.getInputValue(el) };

    this.setState({ source : update(this.state.source, state) });
  },

	render : function () {
    var p = this.state.source;

		return (
			<form className="pure-form pure-form-stacked lead-editor" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create/Edit Source</legend>

          <label htmlFor="name">Name: </label>
          <input id="name" name="name" value={p.name} onChange={this.handleChange} />

          <label htmlFor="company">Company: </label>
          <input id="company" name="company" value={p.company} onChange={this.handleChange} />

          <label htmlFor="phone">Phone: </label>
          <input id="phone" name="phone" value={p.phone} onChange={this.handleChange} />

          <label htmlFor="email">Email: </label>
          <input id="email" name="email" value={p.email} onChange={this.handleChange} />

          <label htmlFor="notes">Notes: </label>
          <textarea id="notes" name="notes" value={p.notes} onChange={this.handleChange} />

          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={p.type} onChange={this.handleChange}>
            <option value="agent">Agent</option>
            <option value="independent">Independent</option>
            <option value="misc">Misc</option>
          </select>

          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={p.status} onChange={this.handleChange}>
            <option value="queued">Waiting on me</option>
            <option value="waiting">Waiting on them</option>
            <option value="dormant">Zombie</option>
            <option value="ignore">Abandoned</option>
          </select>

          <hr />

          <input type="submit" value="Save Source" className="pure-button pure-button-primary button-large right" />
        </fieldset>
      </form>
		);
	}
});

module.exports = React.createClass({
  mixins: [Reflux.connect(sourceStore)],

  handleSubmit : function (data) {
    this.setState(update(this.state, { pending : { $set : true } }));

    if(this.props.routeParams.id) {
      actions.update(data);
    } else {
      actions.create(data);
    }
  },

  componentDidMount : function () {
    if(this.props.routeParams.id) {
      actions.loadSource(this.props.routeParams.id);
    }
  },

  render : function () {
  	return (
  		<Layout>
        <FormContainer result={this.state.result} pending={this.state.pending}>
  				<SourceForm source={this.state.source}  onSubmit={this.handleSubmit} />
  			</FormContainer>
  		</Layout>
  	);
  }
});