
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import CircularProgressBar from '../common/progress.jsx';
import MyDocumentList from "./MyDocumentsList.jsx"
import ViewMyDocuments from '../../actions/documentManagement/viewMyDocuments';
import verifyToken from '../../actions/authentication/verifyToken';


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
      offset: 0,
    };
    
  }

  /**
   * 
   * @memberof UserDocuments
   * @return {void}
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.viewDocuments(this.state.userid,this.state.offset);
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
    if(this.props.isLoading) {
      return (<div id="progress"><CircularProgressBar /></div>)
    }
    return (
      <div className='user_doc row workspace col s12'>
          <Header/>
          <Sidebar/>
          {this.props.documents ?
          <div>
            <MyDocumentList documents={this.props.documents}/> 
            <center>
              <Pagination className="pag"
                items={this.props.pageCount}
                activePage={this.props.currentPage}
                onSelect={(page) => {
                  const offset = (page - 1) * 9;
                  this.props.viewDocuments(this.state.userid, offset);
                }}
              />
            </center>
          </div>
          : <div>{swal("Oops!", "you have no document", "error")}
            {browserHistory.goBack()}
          </div>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
    documents: state.allDocumentsReducer.myDocuments,
    pageCount: state.allDocumentsReducer.pageCount,
    currentPage: state.allDocumentsReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    viewDocuments: (userid, offset) =>
    dispatch(ViewMyDocuments(userid, offset)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);