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
        status : ''
      }
    }
  },

  componentWillReceiveProps : function (props) {
    console.log(props);

    this.setState(update(this.state, {
      source : { $set : props.source }
    }));
  },

  handleSubmit : function (e) {
    e.preventDefault();

    this.props.onSubmit(this.state.lead);
  },

  handleChange : function () {
    var state = {}, el = e.target, name = el.getAttribute('name');

    state[name] = { $set : utils.getInputValue(el) };

    this.setState({ lead : update(this.state.lead, state) });
  },

	render : function () {
    var p = this.state.source;

		return (
			<form className="pure-form pure-form-stacked lead-editor" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create/Edit Source</legend>

          <label htmlFor="name">Name: </label>
          <input className="source-name" id="name" name="name" value={p.name} onChange={this.handleChange} />
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
  			<FormContainer>
  				<SourceForm source={this.state.source} />
  			</FormContainer>
  		</Layout>
  	);
  }
});