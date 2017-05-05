/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import DocumentList from '../document/DocumentList.jsx';
import deleteDocumentAction from
 '../../actions/documentManagement/deleteDocument';
import paginateDocumentAction from
 '../../actions/documentManagement/paginateDocument';
import searchDocumentAction from
 '../../actions/documentManagement/searchDocument';

/**
 * 
 * 
 * @class ViewAllDocuments
 * @extends {Component}
 */
class ViewAllDocuments extends Component {
  /**
   * Creates an instance of ViewAllDocuments.
   * @param {any} props 
   * 
   * @memberof ViewAllDocuments
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      searchTerms: '',
      token: window.localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchDocument = this.searchDocument.bind(this);
    this.refreshDocuments = this.refreshDocuments.bind(this);
  }

  /**
   *  
   * @memberof ViewAllDocuments
   * @return {void}
   */
  componentWillMount() {
    if (this.state.token) {
      this.setState({ 
        userid: jwtDecode(this.state.token).UserId ,
        roleId: jwtDecode(this.state.token).RoleId });
      const offset = 0;
      this.props.paginateDocuments(this.state.token, offset, this.state.limit);
    }
  }


  /**
   * 
   * 
   * @param {any} event 
   * @return {void}
   * 
   * @memberof ViewAllDocuments
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * 
   * 
   * @returns {void}
   * 
   * @memberof ViewAllDocuments
   */
  searchDocument() {
    this.props.searchDocument(this.state.token, this.state.searchTerms);
  }


  /**
   * 
   * 
   * @return {void}
   * @memberof ViewAllDocuments
   */
  refreshDocuments() {
    const offset = 0;
    this.props.paginateDocuments(this.state.token, offset, this.state.limit);
  }


  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof ViewAllDocuments
   */
  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header/>
        <Sidebar />
        <div className="col s12 workspace ">
          <div className="row workspace-header">
            <h4 className="col s6">All Documents</h4>
            <div className="col s6">
              <input
                className="col s8"
                type="text"
                id="searchTerms"
                name="searchTerms"
                placeholder="Search..."
                onChange={this.handleChange} />
              <button className="btn col s2 blue darken-2" id="searchBtn"
                 onClick={this.searchDocument}>
                <i className="material-icons">search</i>
              </button>
              <button className="btn col s2 white" 
                onClick={this.refreshDocuments}>
                <i className="material-icons  refresh-list-btn">
                  autorenew
                </i>
              </button>
            </div>
          </div>
          <DocumentList
            deleteDocument={this.props.deleteDocument}
            userid={this.state.userid}
            roleId={this.state.roleId}
            documents={this.props.paginated || this.props.documents || []}
          />
          <center>
            <Pagination className="pag"
              items={this.props.pageCount}
              onSelect={(page) => {
                const offset = (page - 1) * this.state.limit;
                this.props.paginateDocuments(this.state.token,
                 offset, this.state.limit);
              }}
            />
          </center>
        </div>
      </div>
    );
  }
}


ViewAllDocuments.propTypes = {
  documents: React.PropTypes.array.isRequired,
  paginateDocuments: React.PropTypes.func.isRequired
};

const mapStoreToProps = (state) => {
  
  return {
    documents: state.allDocumentsReducer.documents,
    pageCount: state.allDocumentsReducer.pageCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDocument: documentid =>
    dispatch(deleteDocumentAction(documentid)),
    paginateDocuments: (usertoken, offset, limit) =>
    dispatch(paginateDocumentAction(usertoken, offset, limit)),
    searchDocument: (usertoken, documentName) =>
    dispatch(searchDocumentAction(usertoken, documentName))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewAllDocuments);