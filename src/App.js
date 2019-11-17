import React,{ Component }  from 'react';
import './style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './containers/NavContainer';
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import SinglePage from './containers/SinglePageContainer';
import Signup from './containers/SignupContainer';
import Collection from './components/collection/Collection';
import firebase from 'firebase';

export class App extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user",user);
        isLoggedIn(true);
      } else {
        console.log('No user is signed in.');
      }
    });
  }
  render() {
    const { isAuthenticated, isLoggedIn } = this.props;
    return (
      <Router>
      <div>
        <div className="nav_bar">
          <Nav isAuthenticated={isAuthenticated} isLoggedIn={isLoggedIn}/>
        </div>
        <div>
          <Route exact path="/" render={() => <Home isAuthenticated={isAuthenticated}/>}/>
          <Route path="/images/:imgId" render={() => <SinglePage />} />
          <Route path="/login" render={() => <Login isAuthenticated={isAuthenticated} 
          isLoggedIn={isLoggedIn}/>} />
          <Route path="/signup" render={() => <Signup isAuthenticated={isAuthenticated} 
          isLoggedIn={isLoggedIn}/>}/>
          <Route path="/search/:query" render={() => <Home isAuthenticated={isAuthenticated}/>} />
          <Route path="/collection" render={() => <Collection isAuthenticated={isAuthenticated}/>} />
        </div>
      </div>
    </Router>
    )
  }
}

export default App;

