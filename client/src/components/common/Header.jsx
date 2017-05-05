/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import logOutAction from '../../actions/authentication/logOutAction';
import logo from '../../images/file.jpeg';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.token = (window.localStorage.getItem('token'));
    if (this.token) {
      this.state = { username: jwtDecode(this.token).user };
      this.logout = this.logout.bind(this);
    }
  }


  componentDidMount() {
    $(document).ready(function () {
      $('.pag').children().click( event => event.preventDefault());
      $('select').material_select();
      $("#collapse_btn").sideNav();
      $("#collapse_btn").sideNav('hide');
      $(".dropdown-button").dropdown();
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.props.logout();
    browserHistory.push('/');
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <div className="navbar-fixed">
          <nav className="blue darken-2">
            <div className="nav-wrapper">
             <Link to="/" className="brand-logo"><img src={logo} alt="logo" /></Link>
             <ul className="Docman">
              <li><h3>Docman</h3></li>
            </ul>
              <ul id="loggedinNav">
                <li><Link to="/about-us">About Us</Link></li>
                <li>
                    <Link to="/" className="dropdown-button" data-activates="dropdown1">
                      {this.state.username}<i className="material-icons right">arrow_drop_down</i>
                    </Link>
                    <ul id="dropdown1" className="dropdown-content">
                      <li>
                        <Link to={`/change-password/${jwtDecode(this.token).UserId}`}>
                          <left>
                            Change my password
                          </left>
                        </Link>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <Link to={`/users/${jwtDecode(this.token).UserId}`}>
                          <left>
                            Edit My profile
                          </left>
                        </Link>
                      </li>
                      <li className="divider"></li>
                      <li>
                        <Link id="logout" onClick={this.logout}>
                          <left>
                            Sign Out
                          </left>
                        </Link>
                      </li>
                    </ul>
                </li>
              </ul>
            </div>
            <Link data-activates="slide-out" className="btn blue darken-2" id="collapse_btn">
              <i className="material-icons">view_headline</i></Link>
          </nav>
          
        </div>

      );
    }
    return (
      <div className="navbar-fixed">
        <nav className="blue darken-2">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo"><img src={logo} alt="logo" /></Link>
            <ul className="Docman">
              <li><h3>Docman</h3></li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="./">Home</a></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </nav >
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logOutAction())
  };
};


export default connect(null, mapDispatchToProps)(Header);
