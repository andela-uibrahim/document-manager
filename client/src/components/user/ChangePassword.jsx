/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import editUserAction from '../../actions/userManagement/editUser';
import Validation from '../../helper/validation';
import verifyToken from '../../actions/authentication/verifyToken';
import CircularProgressBar from '../common/progress.jsx';

const validate = new Validation();

const confirmChangePassword = (callback, token, state, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to change this user\'s password',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, update it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
    (changeConfirmed) => {
      if (changeConfirmed  && validate.isValidPassword(state.password)) {
        callback(token, state, userId);
        swal('Updated!', 'The user\'s password has been updated.', 'success');
        if (jwtDecode(token).RoleId === 1) {
          browserHistory.push('/users');
        } else {
          browserHistory.push('/');
        }
      } else {
        swal('Cancelled!', 'The user\'s password was not changed.', 'error');
      }
    });
};

/**
 * 
 * 
 * @export
 * @class ChangePassword
 * @extends {Component}
 */
export class ChangePassword extends Component {
  
  /**
   * Creates an instance of ChangePassword.
   * @param {any} props 
   * 
   * @memberof ChangePassword
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      status: '',
      token: window.localStorage.getItem('token')
    };
    //this.props.isLoading = true;

    this.handleChange = this.handleChange.bind(this);
  }


  /**
   * 
   * @param {any} event 
   * @return {void}
   * 
   * @memberof ChangePassword
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillMount() {
    this.props.verifyToken();
  }

  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof ChangePassword
   */
  render() {
    if(this.props.isLoading) {
      return (<div id="progress"><CircularProgressBar /></div>)
    }
    return (
      <div className="row">
        <Header />
        <Sidebar />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm" onSubmit={(e) => {
            e.preventDefault();
            confirmChangePassword(this.props.changePassword,
             this.state.token, this.state, this.props.params.id);
            }} >
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
              <label htmlFor="password">Enter your password</label>
            </div>
          </div>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                id="btn_login"
                className="col s12 btn btn-large waves-effect amber accent-2"
              >
                Update password
                </button>
            </div>
          </center>
        </form>
      </div>
    );
  }
}

const mapStoreToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
    isLoggedIn: state.verifyTokenReducer.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    changePassword: (token, state, userId) =>
      dispatch(editUserAction(token, state, userId)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ChangePassword);
