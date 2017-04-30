/*eslint-disable no-unused-vars*/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import viewDocumentAction from '../../actions/documentManagement/viewDocument';
import cardimage from '../../images/cardimage.jpeg';

export class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.parseHtml = this.parseHtml.bind(this);
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).UserId });
      this.props.viewDocument(token, this.props.params.id);
    }
  }

  parseHtml(content){
    const html = $.parseHTML(content);
    $('#content').append(html);
  }

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
          <div className="col s8 m8">
              <div className="card">
                <div className="card-panel white">
                   <div className="teal-text left">Access: {` ${this.props.document.access || ''}`}</div>
                  <span className="black-text"> 
                    <h4 className="center">{this.props.document.title || ''}</h4>
                    <br/> 
                    <p id="content" className="black-text">{ this.parseHtml(this.props.document.content ) }</p>
                    <br/>
                  </span>
                </div>
              </div>
            </div> 
          </div>   
            :
            <div>
              Document not Found
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
    viewDocument: (usertoken, documentid) =>
     dispatch(viewDocumentAction(usertoken, documentid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewDocument);
