/*eslint-disable no-unused-vars*/
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import signupAction from '../../actions/authentication/signUpAction';
import Header from '../common/Header.jsx';


export class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      username: '',
      lastname: '',
      email: '',
      password: '',
      error: null,
      success: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.error = nextProps.signUpError;
    this.state.success = nextProps.signUpSuccess;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // clear any error or success messages showing
    this.setState({
      success: null,
      error: null
    });
    this.props.Signup(this.state)
  }

  render() {
    if (window.localStorage.getItem('token')) {
      setTimeout(() => {
        browserHistory.push('/dashboard');
      }, 1000);
    }
    return (
       <div>
        <Header />
        <div className="row">
          <div className="col s4 l6 homePage"/>
          <div className="col l1" />
        <form className="col s8 l4 loginForm" onSubmit={this.handleSubmit} >
        { this.state.error ?
            <div className="login-feedback error">
              { this.state.error }
            </div>
            : <span />
          }

          { this.state.success ?
            <div className="login-feedback success">
              { this.state.success }
            </div>
            : <span />
          }
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="firstname"
                id="firstname"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="firstname">Firstname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="text"
                name="lastname"
                id="lastname"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="lastname">Lastname</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="email">Enter your email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
                minLength="8"
                required
              />
              <label htmlFor="password">Enter your password</label>
            </div>

            <div>
              <span className="changeLogin">Existing User? <Link to="/">Login Here</Link></span>
            </div>
          </div>

          <br />
          <center>
            <div className="row">
              <button
                type="submit"
                name="btn_login"
                id="btn_login"
                className="col s12 btn btn-large waves-effect amber accent-2"
              >
                Register
                </button>
            </div>
          </center>
        </form>
      </div>
    </div>

    );
  }
}

SignUpPage.contextTypes = {
  router: React.PropTypes.object
};

const mapStoreToProps = (state) => {
  return {
    signUpSuccess: state.signUpReducer.success,
    signUpError: state.signUpReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: userDetails => dispatch(signupAction(userDetails))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(SignUpPage);
