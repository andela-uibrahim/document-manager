/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import RoleList from './RoleList.jsx';
import viewAllRolesAction from '../../actions/roleManagement/viewAllRoles';
import deleteRoleAction from '../../actions/roleManagement/deleteRole';
import verifyToken from '../../actions/authentication/verifyToken';
import CircularProgressBar from '../common/progress.jsx';

/**
 * 
 * 
 * @export
 * @class ViewAllRoles
 * @extends {Component}
 */
export class ViewAllRoles extends Component {
  
  /**
   * Creates an instance of ViewAllRoles.
   * @param {any} props 
   * 
   * @memberof ViewAllRoles
   */
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem('token')
    };
  }

  /**
   * 
   * @return {void}
   * 
   * @memberof ViewAllRoles
   */
  componentWillMount() {
    this.props.verifyToken();
    if (this.state.token) {
      this.props.viewRoles(this.state.token);
    }
  }

  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof ViewAllRoles
   */
  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    if(this.props.isLoading) {
      return (<div id="progress"><CircularProgressBar /></div>)
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


ViewAllRoles.propTypes = {
  roles: React.PropTypes.array.isRequired,
};

const mapStoreToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
    roles: state.allRolesReducer.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    deleteRole: roleid => dispatch(deleteRoleAction(roleid)),
    viewRoles: usertoken => dispatch(viewAllRolesAction(usertoken))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllRoles);

