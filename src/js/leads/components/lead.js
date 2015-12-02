var React = require('react'),
    Reflux = require('reflux'),
    update = require('react-addons-update'),
    classNames = require('classnames'),
    Layout = require('../../shared/components/layout'),
    SourceFinder = require('../../sources/components/source.finder'),
    FormError = require('../../shared/components/form.error'),
    FormContainer = require('../../shared/components/form.container');

var leadStore = require('../stores/lead'),
    utils = require('../../shared/utils'),
    actions = require('../actions');

var LeadStatus = React.createClass({
  getInitialState : function () {
    return {
      advanced : false
    }
  },

  handleChange : function () {

  },

  handleAdvancedClick : function (e) {
    e.preventDefault();

    if(this.state.advanced === false) {
      this.setState({ advanced : true });
    } else {
      this.setState({ advanced : false });
    }
  },

  render : function () {
     var classes = classNames({
      'status-comment' : true,
      'visible': this.state.advanced
    });

    return (
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" className="lead-status">
          <option value="junk">Junk</option>
          <option value="pending">Pending</option>
          <option value="applied">Applied</option>
        </select>
        <a href="#" className="toggle-comment" onClick={this.handleAdvancedClick}>Advanced</a>

        <textarea id="status-comment" name="status-comment" className={classes} />
      </div>
    );
  }
});

var LeadForm = React.createClass({
  getInitialState : function () {
    return {
      lead : {
        details : '',
        description : '',
        status : '',
        source : {
          name : '',
          channel : '',
          company : '',
          _id : null
        }
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

    if(name === 'name' || name === 'channel') {
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

  render : function () {
    var p = this.state.lead;

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
          <select id="status" name="status" className="lead-status" value={p.status} onChange={this.handleChange}>
            <option value="junk">Junk</option>
            <option value="pending">Pending</option>
            <option value="applied">Applied</option>
          </select>
          <a href="#" className="toggle-comment">Advanced</a>
          <textarea id="status-comment" name="status-comment" className="status-comment" />

          <LeadStatus />

          <label htmlFor="name">Source: </label>
          <SourceFinder name={p.source.name} onSelect={this.handleSourceChange} />

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
    this.setState(update(this.state, { pending : { $set : true } }));

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
    console.log(this.props);

    return (
      <Layout>
        <FormContainer result={this.state.result} pending={this.state.pending}>
          <LeadForm lead={this.state.lead} errors={this.state.errors} onSubmit={this.handleSubmit} />
        </FormContainer>
      </Layout>
    );
  }
});