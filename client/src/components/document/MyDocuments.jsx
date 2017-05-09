
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
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
      offset: 0
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
                onSelect={(page) => {
                  const offset = (page - 1) * 9;
                  this.props.viewDocuments(this.state.userid, offset);
                }}
              />
              <button onClick={browserHistory.goBack}>Go Back</button>
            </center>
          </div>
          : <div className= "row">
              <div className="col s2 m2">
              </div>
              <div className="col s6 m6">
                <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                      <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>

                  <div className="spinner-layer spinner-red">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                      <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>

                  <div className="spinner-layer spinner-yellow">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                      <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>

                  <div className="spinner-layer spinner-green">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div><
                    div className="gap-patch">
                      <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    documents: state.allDocumentsReducer.myDocuments,
    pageCount: state.allDocumentsReducer.pageCount
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