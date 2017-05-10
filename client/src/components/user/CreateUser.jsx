/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CreateUserAction from '../../actions/userManagement/createUser';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import verifyToken from '../../actions/authentication/verifyToken';
import CircularProgressBar from '../common/progress.jsx';
import Validation from '../../helper/validation';

const validate = new Validation();


/**
 * 
 * 
 * @export
 * @class CreateUser
 * @extends {Component}
 */
export class CreateUser extends Component {

  /**
   * Creates an instance of CreateUser.
   * @param {any} props 
   * 
   * @memberof CreateUser
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      username: '',
      lastname: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.verifyToken();
    }
  /**
   * @param {any} event 
   * @return {void}
   * 
   * @memberof CreateUser
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * 
   * 
   * @param {any} event 
   * @return {void}
   * 
   * @memberof CreateUser
   */
  handleSubmit(event) {
    event.preventDefault();
    if(validate.isValidUserData(userData)){
      this.props.createUser(this.state)
        .then(() => {
          browserHistory.push('/users');
        });
    }
    return null
  }


  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof CreateUser
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
        <form className="col s8 l4 loginForm" onSubmit={this.handleSubmit} >
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
              <label htmlFor="email">Enter email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              />
              <label htmlFor="password">Enter password</label>
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
                Create User
                </button>
            </div>
          </center>
        </form>
        <div className="col s2 l4" />
      </div>

    );
  }
}

CreateUser.contextTypes = {
  router: React.PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
    isLoggedIn: state.verifyTokenReducer.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    createUser: userDetails => dispatch(CreateUserAction(userDetails))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CreateUser);
