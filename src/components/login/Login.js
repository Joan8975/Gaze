/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Login.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
  apiKey: 'AIzaSyBX20Fb46oiimCL7df9UN1Vt_A2DcI7o5I',
  authDomain: 'gaze-8975.firebaseapp.com',
};
firebase.initializeApp(config);

class Login extends Component {
  state = {
    isLoggedIn: false // Local signed-in state.
  };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
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

  render() {
    return (
      <div className="login_form">
        {this.state.isLoggedIn ?
        <Fragment>
          <p>hi! {firebase.auth().currentUser.displayName}</p>
          <img className="user_photo" src={firebase.auth().currentUser.photoURL} alt=""/>
          <button className="common_button mid_button" onClick={()=> firebase.auth().signOut()}>Log Out</button>
        </Fragment>
        :
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        }
      </div>
    )
  }
}

export default Login