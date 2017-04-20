import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import editUserAction from '../actions/userManagement/editUser';


const confirmUpdateUser = (callback,token, userData, userId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to change this user\'s details',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, update it!',
    closeOnConfirm: false,
    closeOnCancel: false
  },
    (deletionConfirmed) => {
      if (deletionConfirmed) {
        callback(token, userData, userId);
        swal('Updated!', 'The user\'s details has been updated.', 'success');
         if (jwtDecode(token).RoleId === 1) {
          browserHistory.push('/users');
        } else {
          browserHistory.push('/');
        }
      } else {
        swal('Cancelled!', 'The user\'s details was not changed.', 'error');
      }
    });
};

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      status: '',
    };
    this.token = window.localStorage.getItem('token');
    this.userId = jwtDecode(this.token).UserId;
    this.roleId = jwtDecode(this.token).RoleId;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    if (!this.token) {
      browserHistory.push('/');
    } else if(this.userId !== this.props.params.id && this.roleId !==1){
      browserHistory.push('/users');
    }

    return (
      <div className="row">
        <Header />
        <Sidebar />
        <div className="col s2 l4 " />
        <form className="col s8 l4 loginForm" onSubmit={(e) => {
            e.preventDefault();
            confirmUpdateUser(this.props.editUser, this.state.token, this.state, this.props.params.id);
            }} >
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="firstname"
                id="firstname"
                onChange={this.handleChange}
              />
              <label htmlFor="firstname">Firstname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="lastname"
                id="lastname"
                onChange={this.handleChange}
              />
              <label htmlFor="lastname">Lastname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
              />
              <label htmlFor="email">Enter your email</label>
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
                Update
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
    user: state.allUsersReducer.user,
    status: state.allUsersReducer.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (token, state, userId) =>
      dispatch(editUserAction(token, state, userId)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
