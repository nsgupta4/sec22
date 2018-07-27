import React from 'react';
const Header = (props) => {
    return (
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">{props.loginUser.first_name} {props.loginUser.last_name}</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li><a onClick={props.logout} ><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Header;