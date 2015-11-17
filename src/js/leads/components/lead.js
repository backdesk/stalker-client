    var React = require('react'),
        Reflux = require('reflux');

    var leadStore = require('../stores/lead'),
        actions = require('../actions');

    var utils = require('../../shared/utils');

    var LeadActivity = React.createClass({
      render : function () {
        var p = this.props.comment;

        return (
          <li>
            <p>{p.subject}</p>
            <p>{p.content}</p>
          </li>
        );
      }
    });

    var LeadActivityList = React.createClass({
      render : function () {
        var commentNodes =  this.props.comments.map(function (comment) {
          return <LeadActivity key={comment._id} comment={comment} />
        });

        return (
          <div>
            <h4>Activity Log</h4>
            <ul>
              {commentNodes}
            </ul>
          </div>
        );
      }
    });

    var LeadActivityForm = React.createClass({
      render : function () {
        return (
          <form>
            <div>
              <label htmlFor="details">Details: </label>
              <input id="details" name="details" />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea id="description" name="description" />
            </div>
          </form>
        );
      }
    });

    var Lead = React.createClass({
      propTypes: {
        lead : React.PropTypes.object.isRequired
      },

      handleStatusChange : function (e) {
        var options = e.target.options;

        actions.changeStatus(utils.getSelectedOption(options));
      },

      render : function () {
        var p = this.props.lead;

        return (
          <form className="pure-form pure-form-stacked">
            <fieldset>
              <legend></legend>

              <label htmlFor="details">Details: </label>
              <input id="details" name="details" value={p.details} />

              <label htmlFor="description">Description: </label>
              <textarea id="description" name="description" value={p.description} />

              <label htmlFor="status">Status:</label>
              <select id="status" name="status" value={p.status} onChange={this.handleStatusChange}>
                <option value="junk">Junk</option>
                <option value="pending">Pending</option>
                <option value="applied">Applied</option>
              </select>

              <input type="submit" className="pure-button pure-button-primary" value="Save Lead" />
            </fieldset>
          </form>
        );
      }
    });

    module.exports = React.createClass({
      mixins: [Reflux.connect(leadStore)],

      componentDidMount : function () {
        actions.loadLead(this.props.routeParams.id);
      },

      render : function () {
        return (
          <div>
            <Lead lead={this.state.lead} onSubmit={this.handleSubmit} />
          </div>
        );
      }
    });