import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginPage from './components/Login.component.jsx';
import SignUpPage from './components/SignUp.component.jsx';
import UserDashBoard from './components/UserDashBoard.component.jsx';
import ViewDocument from './components/ViewDocument.component.jsx';
import CreateDocument from './components/CreateDocument.jsx';

export default(
  <Route path="/">
    <IndexRoute component={LoginPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={SignUpPage} />
    <Route path="/dashboard" component={UserDashBoard} />
    <Route path="/admindashboard" component={UserDashBoard} />
    <Route path="/view-document/:id" component={ViewDocument} />
    <Route path="/create-document" component={CreateDocument} />
  </Route>
);