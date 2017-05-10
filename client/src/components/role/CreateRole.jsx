/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import newRole from '../../actions/roleManagement/newRole';
import Validation from '../../helper/validation';
import verifyToken from '../../actions/authentication/verifyToken';
import CircularProgressBar from '../common/progress.jsx';
const validate = new Validation();

/**
 * 
 * 
 * @export
 * @class CreateRole
 * @extends {Component}
 */
export class CreateRole extends Component {
  
  /**
   * Creates an instance of CreateRole.
   * @param {any} props 
   * 
   * @memberof CreateRole
   */
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 
   * @memberof CreateRole
   * @return {void}
   */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
  }
  
  componentWillMount() {
    this.props.verifyToken();
  }

  /**
   * @param {any} event 
   * @return {void}
   * @memberof CreateRole
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  
  /**
   * 
   * 
   * @param {any} event 
   * @returns {void}
   * 
   * @memberof CreateRole
   */
  handleSubmit(event) {
    event.preventDefault();
    if(validate.isEmpty(this.state.role)){
      toastr.error('Please enter a new Role', 'Error!')
      return false
    }
    this.props.CreateRole(this.state);
  }


  /**
   * @returns {jsx}:
   * 
   * @memberof CreateRole
   */
  render() {
     if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
     if(this.props.isLoading) {
      return (<div id="progress"><CircularProgressBar /></div>)
    }
    return (
      <div className="row dashboardContainer col s12">
        <Header />
        <Sidebar />
        <div className="col s12 workspace">
          <div className="row workspace-header"><h4>Create A Role</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="role"
                  id="role"
                  onChange={this.handleChange}
                  placeholder="Name of Role"
                />
              </div>
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


CreateRole.propTypes = {
  role: PropTypes.object.isRequired,
};

CreateRole.contextTypes = {
  router: PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    CreateRole: roleDetails => dispatch(newRole(roleDetails)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CreateRole);
