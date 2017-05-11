/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import editUserAction from '../../actions/userManagement/editUser';
import viewUserAction from '../../actions/userManagement/viewUser';
import Validation from '../../helper/validation';
import verifyToken from '../../actions/authentication/verifyToken';
import CircularProgressBar from '../common/progress.jsx';

const validate = new Validation();
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
    (updateConfirmed) => {
      if (updateConfirmed && validate.isValidUserData(userData)) {
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

/**
 * 
 * 
 * @export
 * @class EditUser
 * @extends {Component}
 */
export class EditUser extends Component {
  
  /**
   * Creates an instance of EditUser.
   * @param {any} props 
   * 
   * @memberof EditUser
   */
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

  /**
   * 
   * 
   * @param {any} event 
   * @return {void}
   * @memberof EditUser
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * 
   * 
   * 
   * @memberof EditUser
   * @return {void}
   */
  componentWillMount() {
    this.props.verifyToken();
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.viewUser(token, this.props.params.id);
    }
  }


  /**
   * 
   * 
   * @param {any} nextProps 
   * @return {void}
   * @memberof EditUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.user.username,
      email: nextProps.user.email,
      firstname: nextProps.user.firstname,
      lastname: nextProps.user.lastname,
    });
   }
  
  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof EditUser
   */
  render() {
    if (!this.token) {
      browserHistory.push('/');
    } else if((this.userId !== parseInt(this.props.params.id))
     && (this.roleId !==1)){
      browserHistory.push('/users');
    }
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
            confirmUpdateUser(this.props.editUser, this.token, this.state, this.props.params.id);
            }} >
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <label className='active' htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                
                type="text"
                name="firstname"
                id="firstname"
                onChange={this.handleChange}
                value={this.state.firstname}    
              />
              <label className='active' htmlFor="firstname">Firstname</label>
              
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
                value={this.state.lastname}
              />
              <label className='active' htmlFor="lastname">Lastname</label>
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
                value={this.state.email}

              />
              <label className='active' htmlFor="email">Enter your email</label>
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
      isLoading: state.loadingReducer.isLoading,
      isLoggedIn: state.verifyTokenReducer.isLoggedIn,
      user: state.allUsersReducer.user ? state.allUsersReducer.user: '' , 
      status: state.allUsersReducer.status
    };  
  };

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    editUser: (token, state, userId) =>
      dispatch(editUserAction(token, state, userId)),
    viewUser: (token, userId) => 
      dispatch(viewUserAction(token, userId))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
