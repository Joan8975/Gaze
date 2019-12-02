import React, { Component } from 'react'
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Textbox } from "react-inputs-validation";

class Signup extends Component {
  state = {
    email: "",
    password:"",
    username:"",
    hasUsernameError: false,
    hasEmailError: false,
    hasPasswordError: false,
    errorMsg:"",
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

  componentDidUpdate(prepProps) {
    const {isAuthenticated } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
        const { history } = this.props;
        history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { hasEmailError, hasPasswordError, email, password, username } = this.state;
    if ( !hasEmailError && !hasPasswordError && email !== '' && password !== '' && username !== '') {
      firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      ).catch(error => {
        // console.log('err='+error.code,error.message);
        if (error !== '') {
          this.setState({
            email: "",
            password: "",
            username: "",
            hasEmailError: true,
            errorMsg: "The email address is already in use by another account.",
          })
        }
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: this.state.username,
          }).then(() => {
            const displayName = user.displayName;
            
          })
        }
      });
    }
  }

  render() {
    const { email ,hasEmailError, password, hasPasswordError , errorMsg, hasUsernameError,username} = this.state;
    return (
      <div className="login_container">
        <div className="login_title">Start using Gaze!</div>
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
                  customFunc: email => {
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
            <div className={`${username === '' ? 'input_hide': 'input_title'}`}>Username</div>
            <Textbox
              attributesInput={{
                className: `input_field  ${!hasUsernameError ? '': 'input_empt'}`,
                placeholder: "Place your username here",
                type: "text"
              }}
              onChange={(username, e) => {
                this.setState({ username });
              }} 
              onBlur={e => {}}
              validationCallback={res =>
                this.setState({
                  hasUsernameError: res,
                })
              }
              value={username}
              validationOption={{
                name: "Username", 
                check: true,
                required: true,
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
                  const psw = /^\w{6,}$/;
                  if (String(password).match(psw)) {
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
          <button type="submit" className={`mid_button ${email === '' || password === '' || hasEmailError || hasPasswordError ? 'disable_button': 'common_button'}`} onClick={this.handleSubmit} >Submit</button>
        </form>
        <p>Already have an account? <Link className="note_button" to="/login">Login</Link></p>
      </div>
    )
  }
}
export default Signup
