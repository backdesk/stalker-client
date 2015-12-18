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
  render : function () {
    var { suggestion, ...other } = this.props;

    return (<span {...other}>{suggestion.name}</span>);
  }
});

var TagSuggestions = React.createClass({
  mixins: [Reflux.listenTo(tagStore, 'handleSuggestions')],

  getInitialState : function () {
    return { suggestions : [] };
  },

  handleSuggestions : function (data) {
    var tags = this.props.tags, suggestions = data.suggestions;

    suggestions = suggestions.filter(function (suggestion) {
      var exists = _.find(tags, function (tag) {
        return tag._id === suggestion._id;
      });

      return !exists;
    });

    this.setState({
      suggestions : suggestions
    })
  },

  handleClick : function (suggestion, e) {
    e.preventDefault();

    this.replaceState(this.getInitialState());
    this.props.onSelect(suggestion);
  },

  render : function () {
    var nodes, suggestions = this.state.suggestions;

    if(!suggestions.length) return null;

    nodes = suggestions.map(function (suggestion) {
      var click = this.handleClick.bind(this, suggestion);

      return <TagSuggestion onClick={click} key={suggestion._id} suggestion={suggestion} />
    }, this);

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
      search : ''
    }
  },

  componentWillReceiveProps : function (props) {
    this.setState({
      tags : props.tags
    });
  },

  handleChange : function (e) {
    var el = e.currentTarget, value = el.value.trim();

    this.setState(
      update(this.state, { search : { $set : value } })
    );

    if(value.length + 1 >= TERM_THRESHOLD) {
      actions.findTags(value);
    }
  },

  handleSelect : function (tag) {
    var exists = _.find(this.state.tags, function (t) {
      return t._id === tag._id;
    });

    if(!exists) {
      this.setState(update(this.state, {
        tags : { $push : [tag] },
        search : { $set : '' }
      }), this.commit);
    }
  },

  handleRemove : function (index) {
    this.setState(update(this.state, {
      tags : { $splice : [[index, 1]] }
    }));

    this.commit();
  },

  handleBlur : function (e) {
    var el = e.currentTarget;

    el.value = '';
  },

  commit : function () {
    this.props.onTagChange(this.state.tags);
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
        <input id="tag-input" className="tag-input" value={this.state.search} onBlur={this.handleBlur} onChange={this.handleChange} />
        <TagSuggestions tags={tags} onSelect={this.handleSelect} />
      </div>
    )
  }
});

module.exports = React.createClass({
  render : function () {
    return (
      <div className="tags">
        <label htmlFor="tag-input">Tags:</label>
        <TagEditor tags={this.props.tags} onTagChange={this.props.onTagChange} />
      </div>
    );
  }
})