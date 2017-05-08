/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import TinyMCE from 'react-tinymce';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import viewDocument from '../../actions/documentManagement/viewDocument';
import editDocument from '../../actions/documentManagement/editDocument';
import verifyToken from '../../actions/authentication/verifyToken';
import Validation from '../../helper/validation';

const validate = new Validation();


/**
 * 
 * 
 * @export
 * @class EditDocument
 * @extends {Component}
 */
export class EditDocument extends Component {
  
  /**
   * Creates an instance of EditDocument.
   * @param {any} props 
   * 
   * @memberof EditDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      status: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }


  /**
   * 
   * @memberof EditDocument
   * @return {void}
   */
  componentWillMount() {
    this.props.verifyToken();
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.viewDocument(token, this.props.params.id);
    }
  }

  /**
   * 
   * @memberof EditDocument
   * @return {void}
   */
  componentDidMount() {
    $('#access').material_select(this.handleChange.bind(this));
  }


  /**
   * @param {any} nextProps 
   * 
   * @memberof EditDocument
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.document.title,
      access: nextProps.document.access,
      content: nextProps.document.content
    });
    $('#access').val(nextProps.document.access);
  }


  /**
   * @param {any} event 
   * 
   * @memberof EditDocument
   * @return {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** 
   * @param {any} event 
   * 
   * @memberof EditDocument
   * @return {void}
   */
  handleEditorChange(event) {
    this.setState({ content : event.target.getContent() }); 
  }


  /** 
   * @param {any} event 
   * @returns {void}
   * 
   * @memberof EditDocument
   */
  handleSubmit(event) {
    const token = localStorage.getItem('token');
    event.preventDefault();
    if(validate.isEmpty(this.state.title)){
      toastr.error('Please enter a valid title', 'Error!')
      return false
    } else if(validate.isEmpty(this.state.content)){
      toastr.error('Please enter the document contents')
      return false
    }
    this.props.editDocument(this.state, token, this.props.params.id);
  }


  /**
   * 
   * 
   * @returns {jsx}:
   * 
   * @memberof EditDocument
   */
  render() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4></h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  placeholder="Name of Document"
                  value={this.state.title}
                />
              </div>
              <div className="col m3 s12">
                <select
                  name="access"
                  id="access"
                  onChange={this.handleChange}
                  value={this.state.value}
                  className="browser-default"
                >
                  <option value="" disabled >Select Access Type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
            <div className="field row">
              { this.state.content?
                <TinyMCE
                name="content"
                id="content"
                content={this.state.content}
                config={{
                  menu: {
                          edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
                          view: {title: 'View', items: 'visualaid'},
                          format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
                          table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
                          tools: {title: 'Tools', items: 'spellchecker code'}
                       }
                  }}
                onChange={this.handleEditorChange}
              />: <span/> }
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
          </form>
          <div><button onClick={browserHistory.goBack}>Go Back</button></div>
        </div>
      </div>

    );
  }
}


EditDocument.propTypes = {
  document: PropTypes.object.isRequired
};

EditDocument.contextTypes = {
  router: PropTypes.object
};

const mapStoreToProps = (state, ownProps) => {
  return {
    document: state.allDocumentsReducer.document,
    status: state.allDocumentsReducer.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    viewDocument: (token, documentid) => dispatch(viewDocument(token, documentid)),
    editDocument: (documentDetails, token, documentid) =>
    dispatch(editDocument(documentDetails, token, documentid)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditDocument);
