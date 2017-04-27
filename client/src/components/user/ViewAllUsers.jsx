/*eslint-disable no-unused-vars*/
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



export class ViewAllUsers extends Component {
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
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateUserRole(newRoleId, userId) {
    this.props.editUserRole(this.token, { RoleId: newRoleId }, userId);
  }

  changeLimit(value) {
    this.setState({ limit: value });
    this.refreshUsers();
  }

  searchUser() {
    this.props.searchUser(this.token, this.state.searchTerms);
  }

  refreshUsers() {
    const offset = 0;
    this.props.paginateUsers(this.token, offset, this.state.limit);
    this.setState({
      searchTerms: ''
    });
  }

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
            <h4 className="col s8">All Users</h4>
            <div className="col s4">
              <input
                className="col s10"
                type="text"
                id="searchTerms"
                name="searchTerms"
                value={this.state.searchTerms}
                placeholder="Search..."
                onChange={this.handleChange} />
              <button className="btn col s2" onClick={this.searchUser}>
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
          <div className="col m1" />
          <div className="col m4 pagination-links">
            <Link onClick={() => this.changeLimit(5)}>View 5 per page</Link>
            <Link onClick={() => this.changeLimit(10)}>View 10 per page</Link>
            <Link onClick={() => this.changeLimit(20)} >View 20 per page</Link></div>
          <div className="col m5" /><div className="col m2">
            <Link onClick={this.refreshUsers}>
              <i className="material-icons refresh-list-btn">
                settings_backup_restore</i></Link></div>
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
                <Pagination
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


ViewAllUsers.PropTypes = {
  users: React.PropTypes.array.isRequired,
  paginateUsers: React.PropTypes.func.isRequired,
  roles: React.PropTypes.array.isRequired
};

const mapStoreToProps = (state) => {
  return {
    users: state.allUsersReducer.users,
    pageCount: state.allUsersReducer.pageCount | 1,
    paginated: state.allUsersReducer.paginated,
    roles: state.allRolesReducer.roles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (usertoken, userid) => dispatch(deleteUserAction(usertoken, userid)),
    viewUsers: usertoken => dispatch(viewAllUsersAction(usertoken)),
    paginateUsers: (usertoken, offset, limit) => dispatch(paginateUserAction(usertoken, offset, limit)),
    searchUser: (usertoken, userNames) => dispatch(searchUserAction(usertoken, userNames)),
    editUserRole: (usertoken, userData, userId) => dispatch(editUserRoleAction(usertoken, userData, userId)),
    getRoles: usertoken => dispatch(viewAllRolesAction(usertoken)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllUsers);
