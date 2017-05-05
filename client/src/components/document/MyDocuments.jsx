
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import MyDocumentList from "./MyDocumentsList.jsx"
import ViewMyDocuments from '../../actions/documentManagement/viewMyDocuments';

 /**
  * 
  * 
  * @export
  * @class UserDocuments
  * @extends {Component}
  */
 export class UserDocuments extends Component {
  
  /**
   * Creates an instance of UserDocuments.
   * @param {any} props 
   * 
   * @memberof UserDocuments
   */
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    this.state = {
      userid: jwtDecode(this.token).UserId,
    };
  }

  /**
   * 
   * @memberof UserDocuments
   * @return {void}
   */
  componentWillMount() {
    this.props.viewDocuments(this.state.userid);
  }
  


  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof UserDocuments
   */
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