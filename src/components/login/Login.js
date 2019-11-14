/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Login.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withRouter } from 'react-router-dom';


class Login extends Component {
  state = {
    isLoggedIn: false // Local signed-in state.
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({isLoggedIn: !!user})
        console.log("user",user)
      }
    );
  }

  componentDidUpdate(prepProps,prevState) {
    if (prevState.isLoggedIn === false && this.state.isLoggedIn === true) {
        const { history } = this.props;
        history.push('/');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var data = {email:'',password: ''};
    firebase.auth().createUserWithEmailAndPassword(
      data.email,
      data.password
    ).then(res => {
      console.log(res);
    }).then(() => {
      const { history } = this.props;
      history.push('/');
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updateProfile({
          displayName: "lisa",
        }).then(() => {
          const displayName = user.displayName;
        }, function(error) {
        });
      }
    });
  }
  
  

  // handleSubmit = (e) => {
    // e.preventDefault();
  //   var data = {email:'joan8975@email.com',password: 'test1234'};
  //     firebase.auth().signInWithEmailAndPassword(
  //       data.email,
  //       data.password
  //     ).then(res => {
  //       console.log(res);
  //     })
  // }

  render() {
    return (
      <div className="login_form">
        <div className="login_container">
        	<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          <form>
            <div className="input_title">email</div>
            <input />
            <div className="input_title">password</div>
            <input />
            <button type="submit" className="common_button mid_button" >Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)