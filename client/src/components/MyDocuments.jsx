import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import MyDocumentList from "./MydocumentsList.jsx"
import ViewMyDocuments from '../actions/documentManagement/viewMyDocuments';
//import paginateDocumentAction from '../actions/documentManagement/paginateDocument';

class UserDocuments extends Component {
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    this.state = {
      userid: jwtDecode(this.token).UserId,
    };
  }

  componentWillMount() {
    this.props.viewDocuments(this.state.userid);
  }
  

  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className='user_doc row workspace col s12'>
          <Header/>
          <Sidebar/>
          {this.props.documents ? <MyDocumentList documents={this.props.documents}/> : <div/> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    documents: state.allDocumentsReducer.documents,
    pageCount: state.allDocumentsReducer.pageCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewDocuments: userid =>
    dispatch(ViewMyDocuments(userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);