import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import logoutAction from '../actions/authentication/logoutAction';
import logo from '../images/file.jpeg';

export class Header extends Component {
  constructor(props) {
    super(props);
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = { username: jwtDecode(token).user };
      this.logout = this.logout.bind(this);
    }
  }


  componentDidMount() {
    $(document).ready(function () {
      $('.pag').click( event => event.preventDefault());
      $('select').material_select();
      $("#collapse_btn").sideNav();
      $("#collapse_btn").sideNav('hide');
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
              <ul id="loggedinNav">
                <li><Link to="/">{this.state.username}</Link></li>
                <li><Link to="/my-documents">My Documents</Link></li>
                <li><Link id="logout" onClick={this.logout}>Sign Out</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
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
    logout: () => dispatch(logoutAction())
  };
};
const mapStoreToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Header);
