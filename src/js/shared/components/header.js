var React = require('react');

module.exports = React.createClass({
  handleClick : function (e) {
  	e.preventDefault();
  },

  render : function () {
    return (
      <header className="nav pure-menu-fixed pure-menu-horizontal">
    		<a className="pure-menu-heading" href="">Meh to deh werld</a>
    		<ul className="nav-options pure-menu-list">
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Taim</a></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Zombies</a></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Leads</a></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Settings</a></li>
          <li className="pure-menu-item"><a href="#" className="pure-menu-link">Bai</a></li>
        </ul>
      </header>
    );
  }
});
