import React, { Component } from 'react';
class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav pull-right">
                    <li><a href="/">Home</a> </li>
                    <li><a href="/#SignIn">SignIn</a> </li>
                    <li><a href="/#SignUp">SignUp</a> </li>
                    <li><a href="/#About">About</a> </li>
                </ul>
            </div>
        </nav>
      
    );
  }
}
export default NavBar;