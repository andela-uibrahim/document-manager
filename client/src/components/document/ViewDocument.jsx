/*eslint-disable no-unused-vars*/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import viewDocumentAction from '../../actions/documentManagement/viewDocument';
import cardimage from '../../images/cardimage.jpeg';
import verifyToken from '../../actions/authentication/verifyToken';

// Require Editor JS files.
require("froala-editor/js/froala_editor.pkgd.min.js");

// Require Editor CSS files.
require("froala-editor/css/froala_style.min.css");
require("froala-editor/css/froala_editor.pkgd.min.css");

// Require Font Awesome.
require('font-awesome/css/font-awesome.css');

let FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView'); 


/**
 * 
 * 
 * @export
 * @class ViewDocument
 * @extends {Component}
 */
export class ViewDocument extends Component {
  
  /**
   * Creates an instance of ViewDocument.
   * @param {any} props 
   * 
   * @memberof ViewDocument
   */
  constructor(props) {
    super(props);
  }

  /**
   * 
   * @memberof ViewDocument
   * @return {void}
   */
  componentWillMount() {
    this.props.verifyToken();
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).UserId });
      this.props.viewDocument(token, this.props.params.id);
    }
  }

  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof ViewDocument
   */
  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="user_doc row col s12">
        <Header />
        <Sidebar />
        {(this.props.document) ?
        
        <div className= "row">
         <br/> <br/>
          <div className="col s2 m2">
          </div>
          <div className="col s10 m10">
              <div className="teal-text right access">Access: {` ${this.props.document.access || ''}`}</div>
                <span className="black-text"> 
                  <h4 className="center">{this.props.document.title || ''}</h4>
                  <br/>              
                  <FroalaEditorView
                    model={this.props.document.content}
                  /> 
                  <br/>
                </span>
            </div> 
          </div>   
            :
            <div className= "row">
              <div className="col s2 m2">
              </div>
              <div className="col s8 m8">
                <div className="progress">
                  <div className="indeterminate"></div>
                </div>
               </div>
            </div>
          }
        </div>

      );
    }
  }


ViewDocument.propTypes = {
  viewDocument: PropTypes.func
};

const mapStoreToProps = (state) => {
  return {
    document: state.allDocumentsReducer.document
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    viewDocument: (usertoken, documentid) =>
     dispatch(viewDocumentAction(usertoken, documentid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewDocument);
