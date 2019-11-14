/* jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'
import './Signup.css';
import firebase from 'firebase';


class Signup extends Component {
  state = {
    isLoggedIn: false // Local signed-in state.
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({isLoggedIn: !!user})
        console.log("user",user)
      }
    );
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    var data = {email:'joan8975@email.com',password: 'test1234'};
      firebase.auth().signInWithEmailAndPassword(
        data.email,
        data.password
      ).then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div className="login_container">
        <form>
          <div className="input_title">email</div>
          <input />
          <div className="input_title">username</div>
          <input />
          <div className="input_title">password</div>
          <input />
          <button type="submit" className="common_button mid_button" >Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup
// firebase.auth().currentUser.email