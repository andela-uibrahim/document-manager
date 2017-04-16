import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginPage from './components/Login.component.jsx';
import SignUpPage from './components/SignUp.component.jsx';
import UserDashBoard from './components/UserDashBoard.component.jsx';
import ViewDocument from './components/ViewDocument.component.jsx';
import CreateDocument from './components/CreateDocument.jsx';
import EditDocument from './components/EditDocument.jsx';
import CreateRole from './components/CreateRole.jsx';
import ViewAllRoles from './components/ViewAllRoles.jsx';
import ViewAllUsers from './components/ViewAllUsers.jsx';
import EditUser from './components/editUser.jsx';
import CreateUser from './components/CreateUser.jsx';


export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
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

    
  </Route>
);