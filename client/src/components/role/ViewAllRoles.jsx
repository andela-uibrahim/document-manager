import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import RoleList from './RoleList.jsx';
import viewAllRolesAction from '../../actions/roleManagement/viewAllRoles';
import deleteRoleAction from '../../actions/roleManagement/deleteRole';

export class ViewAllRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem('token')
    };
  }

  componentWillMount() {
    if (this.state.token) {
      this.props.viewRoles(this.state.token);
    }
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
            <h4 className="col s8">All Roles</h4></div>
          <RoleList
            deleteRole={this.props.deleteRole}
            roles={this.props.roles || []}
          />
        </div>
      </div>
    );
  }
}


ViewAllRoles.PropTypes = {
  roles: React.PropTypes.array.isRequired,
};

const mapStoreToProps = (state) => {
  return {
    roles: state.allRolesReducer.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRole: roleid => dispatch(deleteRoleAction(roleid)),
    viewRoles: usertoken => dispatch(viewAllRolesAction(usertoken))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllRoles);
