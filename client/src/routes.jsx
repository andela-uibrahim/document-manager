/*eslint-disable no-unused-vars*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginPage from
 './components/authentication/Login.jsx';
import SignUpPage from
 './components/authentication/SignUp.jsx';
import UserDashBoard from
 './components/user/UserDashboard.jsx';
import ViewDocument from
 './components/document/ViewDocument.jsx';
import CreateDocument from
 './components/document/CreateDocument.jsx';
import EditDocument from
 './components/document/EditDocument.jsx';
import CreateRole
 from './components/role/CreateRole.jsx';
import ViewAllRoles from
 './components/role/ViewAllRoles.jsx';
import ViewAllUsers from
 './components/user/ViewAllUsers.jsx';
import EditUser from
 './components/user/EditUser.jsx';
import CreateUser from
 './components/user/CreateUser.jsx';
import ChangePassword from
 './components/user/ChangePassword.jsx';
import MyDocuments from
 './components/document/MyDocuments.jsx';

const redirect = (path) => {
  return window.location.href = '/';
}

export default(
  <Route >
    <Route path="/" component={LoginPage} />
    <Route path="/users/:id" component={EditUser} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
    <Route path="/dashboard" component={UserDashBoard} />
    <Route path="/admindashboard" component={UserDashBoard} />
    <Route path="/view-document/:id" component={ViewDocument} />
    <Route path="/create-document" component={CreateDocument} />
    <Route path="/edit-document/:id" component={EditDocument} />
    <Route path="/create-role" component={CreateRole} />
    <Route path="/roles" component={ViewAllRoles} />
    <Route path="/users" component={ViewAllUsers} />
    <Route path="/create-user" component={CreateUser} />
    <Route path="/change-password/:id" component={ChangePassword} />
    <Route path="/my-documents" component={MyDocuments} />
    
  </Route>
);