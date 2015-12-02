var React = require('react'),
    Link = require('react-router').Link,
    IndexLink = require('react-router').IndexLink;

module.exports = React.createClass({
  handleClick : function (e) {
  	e.preventDefault();
  },

  render : function () {
    return (
      <header className="nav pure-menu-fixed pure-menu-horizontal">
    		<IndexLink to="/" className="pure-menu-heading">Meh to deh werld</IndexLink>
    		<ul className="nav-options pure-menu-list">
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Taim</a></li>
          <li className="pure-menu-item"><Link to="/leads" className="pure-menu-link">Leads</Link></li>
          <li className="pure-menu-item"><Link to="/sources" className="pure-menu-link">Sources</Link></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Settings</a></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Bai</a></li>
        </ul>
      </header>
    );
  }
});
