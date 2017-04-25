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
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userid: jwtDecode(token).UserId });
      this.props.viewDocument(token, this.props.params.id);
    }
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
          <div className="col s2 m3">
          </div>
          <div className="col s6 m6">
              <div className="card">
                <div className="card-image">
                  <img src={cardimage}/>
                  <span className="card-title">{this.props.document.title || ''}</span>
                </div>
                <div className="card-content">
                  <p>{ this.props.document.content || '' }</p>
                </div>
                <div className="card-action">
                  <a href="#">{this.props.document.access || ''}</a>
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
    viewDocument: (usertoken, documentid) => dispatch(viewDocumentAction(usertoken, documentid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewDocument);
