var React = require('react'),
    _ = require('lodash'),
    update = require('react-addons-update'),
    Reflux = require('reflux');

var tagStore = require('../stores/lead.tags'),
    actions = require('../actions');

var TERM_THRESHOLD = 3;

var Tag = React.createClass({
  handleRemove : function (e) {
    e.preventDefault();

    this.props.onRemove(this.props.index);
  },

  render : function () {
    return (
      <span className="tag"><a href='#' onClick={this.handleRemove}>x</a> {this.props.tag.name}</span>
    )
  }
});

var TagSuggestion = React.createClass({
  handleClick : function (e) {
    e.preventDefault();

    this.props.onSelect(this.props.suggestion);
  },

  render : function () {
    var suggestion = this.props.suggestion;

    return (<span onClick={this.handleClick} key={suggestion._id}>{suggestion.name}</span>);
  }
});

var TagSuggestions = React.createClass({
  mixins: [Reflux.connect(tagStore)],

  componentWillReceiveProps : function (props) {
    this.setState({
      suggestions : props.suggestions
    });
  },

  render : function () {
    var nodes, suggestions = this.state.suggestions;

    if(!suggestions) return null;

    nodes = suggestions.map(function (suggestion) {
      return <TagSuggestion onSelect={this.props.onSelect} key={suggestion._id} suggestion={suggestion} />
    }.bind(this));

    return (
      <div className="tag-suggestions">
        {nodes}
      </div>
    );
  }
});

var TagEditor = React.createClass({
  getInitialState : function () {
    return {
      tags : [],
      suggestions : []
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState({
      tags : props.tags
    });
  },

  handleKeyPress : function (e) {
    var el = e.currentTarget, value = el.value.trim();

    if(value.length >= TERM_THRESHOLD) {
      actions.findTags(value);
    }
  },

  handleSelect : function (tag) {
    var exists = _.find(this.state.tags, function (t) {
      return t._id === tag._id;
    });

    if(!exists) {
      this.setState(
        update(this.state, { tags : { $push : [tag] } })
      );
    }
  },

  handleRemove : function (index) {
    this.setState(
      update(this.state, { tags : { $splice : [[index, 1]] } })
    );
  },

  render : function () {
    var nodes, tags = this.state.tags;

    if(!tags) return null;

    nodes = tags.map(function (tag, index) {
      return <Tag tag={tag} key={tag._id} index={index} onRemove={this.handleRemove} />
    }.bind(this));

    return (
      <div className="tag-editor">
        <span>
          {nodes}
        </span>
        <input id="tag-input" className="tag-input" onKeyPress={this.handleKeyPress} />
        <TagSuggestions suggestions={this.state.suggestions} onSelect={this.handleSelect} />
      </div>
    )
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <div className="tags">
        <label htmlFor="tag-input">Tags:</label>
        <TagEditor tags={this.props.tags} />
      </div>
    );
  }
})