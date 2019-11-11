import React from 'react';
import './style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './containers/NavContainer';
import Login from './components/login/Login';
import Home from './containers/HomeContainer';
import SinglePage from './containers/SinglePageContainer';
import AddPost from './containers/AddPostContainer';

const App = () => (
  <Router>
    <div>
      <div className="nav_bar">
        <Nav />
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/images/:imgId" render={() => <SinglePage />} />
        <Route path="/addPost" component={AddPost} />
        <Route path="/search/:query" render={() => <Home />} />
      </div>
    </div>
  </Router>
);
export default App;
