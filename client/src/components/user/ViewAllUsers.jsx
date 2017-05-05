/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import UserList from './UserList.jsx';
import viewAllUsersAction from '../../actions/userManagement/viewAllusers';
import viewAllRolesAction from '../../actions/roleManagement/viewAllRoles';
import deleteUserAction from '../../actions/userManagement/deleteUser';
import paginateUserAction from '../../actions/userManagement/paginateUser';
import searchUserAction from '../../actions/userManagement/searchUser';
import editUserRoleAction from '../../actions/userManagement/editUser';



/**
 * 
 * 
 * @export
 * @class ViewAllUsers
 * @extends {Component}
 */
export class ViewAllUsers extends Component {
  
  /**
   * Creates an instance of ViewAllUsers.
   * @param {any} props 
   * 
   * @memberof ViewAllUsers
   */
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    this.RoleId = jwtDecode(this.token).RoleId
    this.state = {
      limit: 10,
      searchTerms: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
  }

  
  /**
   * 
   * 
   * @return {void}
   * @memberof ViewAllUsers
   */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    if (this.token) {
      this.setState({ userid: jwtDecode(this.token).UserId });
      const offset = 0;
      this.props.paginateUsers(this.token, offset, this.state.limit);
      this.props.getRoles(this.token);
    }
    $('.pag').children().click( event => event.preventDefault());
  }


  /**
   * 
   * 
   * @param {any} event 
   * @return {void}
   * @memberof ViewAllUsers
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * 
   * 
   * @param {any} newRoleId 
   * @param {any} userId 
   * @return {void}
   * @memberof ViewAllUsers
   */
  updateUserRole(newRoleId, userId) {
    this.props.editUserRole(this.token, { RoleId: newRoleId }, userId);
  }

  
  /**
   * 
   * 
   * @param {any} value 
   * @return {void}
   * @memberof ViewAllUsers
   */
  changeLimit(value) {
    this.setState({ limit: value });
    this.refreshUsers();
  }


  /**
   * 
   * 
   * @return {void}
   * @memberof ViewAllUsers
   */
  searchUser() {
    this.props.searchUser(this.token, this.state.searchTerms);
  }


  /**
   * 
   * 
   * @return {void}
   * @memberof ViewAllUsers
   */
  refreshUsers() {
    const offset = 0;
    this.props.paginateUsers(this.token, offset, this.state.limit);
    this.setState({
      searchTerms: ''
    });
  }


  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof ViewAllUsers
   */
  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header">
            <h4 className="col s6">All Users</h4>
            <div className="col s6">
              <input
                className="col s8"
                type="text"
                id="searchTerms"
                name="searchTerms"
                value={this.state.searchTerms}
                placeholder="Search..."
                onChange={this.handleChange} />
<<<<<<< HEAD
<<<<<<< Updated upstream
              <button className="btn col s2" onClick={this.searchUser}>
=======
              <button className="btn col s2 blue darken-2"
               onClick={this.searchUser}>
>>>>>>> Stashed changes
=======
              <button className="btn col s2 blue darken-2" onClick={this.searchUser}>
>>>>>>> 9ff95dfaad21812046663097799073be7f6fc412
                <i className="material-icons">search</i>
              </button>
              <button className="btn col s2 white" onClick={this.refreshUsers}>
                <i className="material-icons  refresh-list-btn">autorenew</i>
              </button>
            </div>
          </div>
          {this.props.users?
            this.props.users.length > 0?
              <div>
                <UserList
                  deleteUser={this.props.deleteUser}
                  userid={this.state.userid} 
                  users={this.props.users || []}
                  roles={this.props.roles || []}
                  updateUserRole={this.updateUserRole}
                  roleId={this.RoleId}
                /> 
                <center>
                <Pagination className="pag"
                  items={this.props.pageCount}
                  onSelect={(page) => {
                    const token = window.localStorage.getItem('token');
                    const offset = (page - 1) * this.state.limit;
                    this.props.paginateUsers(token, offset, this.state.limit);
                  }}
                />
                </center>
              </div>
              : <div>{swal("Oops!", "No user found", "error")} </div> 
            : <div/> 
        }              
        </div>
      </div>
    );
  }
}


ViewAllUsers.propTypes = {
  users: React.PropTypes.array.isRequired,
  paginateUsers: React.PropTypes.func.isRequired,
  roles: React.PropTypes.array.isRequired
};

const mapStoreToProps = (state) => {
  console.log(state.allUsersReducer.pageCount);
  return {
    users: state.allUsersReducer.users,
    pageCount: state.allUsersReducer.pageCount | 1,
    paginated: state.allUsersReducer.paginated,
    roles: state.allRolesReducer.roles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (usertoken, userid) => 
      dispatch(deleteUserAction(usertoken, userid)),
    viewUsers: usertoken => dispatch(viewAllUsersAction(usertoken)),
    paginateUsers: (usertoken, offset, limit) => 
      dispatch(paginateUserAction(usertoken, offset, limit)),
    searchUser: (usertoken, userNames) => 
      dispatch(searchUserAction(usertoken, userNames)),
    editUserRole: (usertoken, userData, userId) => 
      dispatch(editUserRoleAction(usertoken, userData, userId)),
    getRoles: usertoken => 
      dispatch(viewAllRolesAction(usertoken)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllUsers);
