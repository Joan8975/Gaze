/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Login.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withRouter, Link } from 'react-router-dom';
import { Textbox } from "react-inputs-validation";


class Login extends Component {
  state = {
    email: "",
    password: "",
    hasEmailError: true,
    hasPasswordError: true,
    emailErrorMsg: "",
    passwordErrorMsg: "",
    isSubmitting: false
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  componentDidMount() {
    const { isLoggedIn } = this.props;
    firebase.auth().onAuthStateChanged(
      (user) => {
        isLoggedIn(!!user)
        console.log("user",user)
      }
    );
  }

  componentDidUpdate(prepProps,prevState) {
    const {isAuthenticated } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
        const { history } = this.props;
        history.push('/');
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { hasEmailError, hasPasswordError, email, password } = this.state;
    if ( !hasEmailError && !hasPasswordError ) {
        firebase.auth().signInWithEmailAndPassword(
          email,
          password
        ).catch(error => {
          console.log('err='+error.code,error.message);
          if (error !== '') {
            this.setState({
              hasEmailError: true,
              hasPasswordError: true,
              emailErrorMsg: "Your email or password is not correct.",
              passwordErrorMsg: "Your email or password is not correct.",
              email: "",
              password: "",
            })
          }
        })
    }
  }

  handleEmailChange = (email,e) => {
    let hasEmailError = true;
    let emailErrorMsg = "";
    if (email.replace(/\s/g, "") !== "") {
      hasEmailError  = false;
    } else {
      emailErrorMsg = "Email cannot be empty";
    }
    this.setState({ email, hasEmailError, emailErrorMsg });
  }

  handlePasswordChange = (password,e) => {
    let hasPasswordError = true;
    let passwordErrorMsg = "";
    if (password.replace(/\s/g, "") !== "") {
      hasPasswordError  = false;
    } else {
      passwordErrorMsg = "Password cannot be empty";
    }
    this.setState({ password, hasPasswordError, passwordErrorMsg });
  }


  render() {
    const { email,emailErrorMsg, password, passwordErrorMsg, hasEmailError, hasPasswordError } = this.state;
    
    return (
      <div className="login_container">
        <div className="login_title">Great to see you again!</div>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        <p>or</p>
        <form>
          <div class="text_field">
            <div className={`${email === '' ? 'input_hide': 'input_title'}`}>Email</div>
            <Textbox
              attributesInput={{
                name: "email",
                className: `input_field  ${emailErrorMsg === '' ? '': 'input_empt'}`,
                placeholder: "Email",
                type: "text"
              }}
              value={email}
              onChange={this.handleEmailChange}
              validationOption={{
                required: true,
              }}
            />
            <div className={`${emailErrorMsg === '' ? 'input_hide': 'errorMsg'}`}><i class="fas fa-exclamation-circle"></i>{emailErrorMsg}</div>
          </div>
          <div class="text_field">
            <div className={`${password === '' ? 'input_hide': 'input_title'}`}>Password</div>
            <Textbox
              attributesInput={{
                name: "password",
                className: `input_field  ${passwordErrorMsg === '' ? '': 'input_empt'}`,
                placeholder: "Password",
                type: "password"
              }}
              value={password}
              onChange={this.handlePasswordChange}
              validationOption={{
                required: true,
              }}
            />
            <div className={`${passwordErrorMsg === '' ? 'input_hide': 'errorMsg'}`}><i class="fas fa-exclamation-circle"></i>{passwordErrorMsg}</div>
          </div>
          <button type="submit" className={`mid_button ${!hasEmailError &&  !hasPasswordError ? 'common_button': 'disable_button'}`} onClick={this.handleSubmit} >Submit</button>
        </form>
        <p>No account yet? <Link className="note_button" to="/signup">Sign up</Link></p>
      </div>
    )
  }
}

export default withRouter(Login)