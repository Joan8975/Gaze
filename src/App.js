import React,{ Component }  from 'react';
import './style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './containers/NavContainer';
import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import SinglePage from './containers/SinglePageContainer';
import Signup from './containers/SignupContainer';
import Saves from './containers/SavesContainer';
import Collections from './containers/CollectionsContainer';
import firebase from 'firebase';

export class App extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("user",user);
        isLoggedIn(true);
      } 
      // else {
      //   console.log('No user is signed in.');
      // }
    });
  }
  render() {
    const { isAuthenticated, isLoggedIn } = this.props;
    return (
      <Router>
      <div>
        <Nav isAuthenticated={isAuthenticated} isLoggedIn={isLoggedIn}/>
        <div>
          <Route exact path="/" render={() => <Home isAuthenticated={isAuthenticated}/>}/>
          <Route path="/images/:imgId" render={() => <SinglePage isAuthenticated={isAuthenticated}/>} />
          <Route path="/login" render={() => <Login isAuthenticated={isAuthenticated} 
          isLoggedIn={isLoggedIn}/>} />
          <Route path="/signup" render={() => <Signup isAuthenticated={isAuthenticated} 
          isLoggedIn={isLoggedIn}/>}/>
          <Route path="/search/:query" render={() => <Home isAuthenticated={isAuthenticated}/>} />
          <Route path="/saves/photos" render={() => <Saves photoTab  topSearch/>} />
          <Route path="/saves/collections" render={() => <Saves/>} topSearch/>
          <Route path="/collections/:collectionName" render={() => <Collections topSearch/>} />
        </div>
      </div>
    </Router>
    )
  }
}

export default App;

