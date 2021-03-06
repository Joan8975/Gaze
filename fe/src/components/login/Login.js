import React, { Component } from 'react'
import './Login.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import { Textbox } from "react-inputs-validation";

class Login extends Component {
  state = {
    email: "",
    password:"",
    hasEmailError: false,
    hasPasswordError: false,
    errorMsg:"",
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
      }
    );
  }

  componentDidUpdate(prepProps,prevState) {
    const { isAuthenticated } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
        const { history } = this.props;
        history.push('/');
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { hasEmailError, hasPasswordError, email, password } = this.state;
    if ( !hasEmailError && !hasPasswordError && email !== '' && password !== '') {
        firebase.auth().signInWithEmailAndPassword(
          email,
          password
        ).catch(error => {
          // console.log('err='+error.code,error.message);
          if (error !== '') {
            this.setState({
              email: "",
              password: "",
              hasEmailError: true,
              hasPasswordError: true,
              errorMsg: "Your email or password is not correct.",
            })
          }
        })
    }
  }

  render() {
    const { email ,hasEmailError, password, hasPasswordError , errorMsg} = this.state;
    return (
      <div className="login_container">
        <div className="login_title">Great to see you again!</div>
        <div class="con">
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
        <p>or</p>
        <form>
          {errorMsg !== '' ? <div className="errorMsg "><i class="fas fa-exclamation-circle"></i>{errorMsg}</div>: ''}
          <div className="text_field">
            <div className={`${email === '' ? 'input_hide': 'input_title'}`}>Email</div>
            <Textbox
              attributesInput={{
                className: `input_field  ${!hasEmailError ? '': 'input_empt'}`,
                placeholder: "Place your email here",
                type: "text"
              }}
              onChange={(email, e) => {
                this.setState({ email });
              }} 
              onBlur={e => {}}
              validationCallback={res =>
                this.setState({
                  hasEmailError: res,
                })
              }
              value={email}
              validationOption={{
                name: "Email", 
                check: true,
                required: true,
                customFunc: (email) => {
                  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (reg.test(String(email).toLowerCase())) {
                    this.setState({ hasEmailError: false});
                    return true;
                  } else {
                    this.setState({ hasEmailError: true,});
                    return "Ivalid email address";
                  }
                }
              }}
            />
          </div>
          <div className="text_field">
            <div className={`${password === '' ? 'input_hide': 'input_title'}`}>Password</div>
            <Textbox
                attributesInput={{
                  className: `input_field  ${!hasPasswordError ? '': 'input_empt'}`,
                  placeholder: "Place your password here (min. 6 char)",
                  type: "password"
                }}
                onChange={(password, e) => {
                  this.setState({ password });
                }}
                onBlur={e => {}}
                validationCallback={res =>
                  this.setState({
                    hasPasswordError: res,
                  })
                }
                value={password}
                validationOption={{
                  name: "Password", 
                  check: true,
                  required: true,
                  customFunc: (password) => {
                    const pwd = /^\w{6,}$/;
                    if (String(password).match(pwd)) {
                      this.setState({ hasPasswordError: false});
                      return true;
                    } else {
                      this.setState({ hasPasswordError: true,});
                      return "Password cannot less than 6";
                    }
                  }
                }}
              />
          </div>
          <button type="submit" className={`mid_button ${email === '' || password === '' || hasEmailError || hasPasswordError  ? 'disable_button': 'common_button'}`} onClick={this.handleSubmit} >Submit</button>
        </form>
        <p>No account yet? <Link className="note_button" to="/signup">Sign up</Link></p>
      </div>
    )
  }
}

export default Login