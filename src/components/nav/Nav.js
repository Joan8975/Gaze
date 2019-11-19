/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component }  from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import Notifications, {notify} from 'react-notify-toast';

const MenuLink = ({ label, to, activeOnlyWhenExact, updateNav,className }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={`${className} ${match ? `${className}_active` : ''}`} to={to} onClick={() => updateNav(to)}>{label}</Link>
    )}
  />
);

class Nav extends Component {

  handleChange = (e) => {
    const {query} = this.props;
    query(e.target.value)
  }

  handleKeyPress = (e) => {
    const {history,getImgsList,queryTxt,initImgs,getSynonymList} = this.props;
    if(e.key === 'Enter') {
      initImgs([])
      getImgsList(1, queryTxt);
      getSynonymList(queryTxt)
      history.push('/search/'+ queryTxt);
    }
  }
  handleLogout = () => {
    this.props.isLoggedIn(false);
    firebase.auth().signOut()
  }
  componentDidUpdate(prepProps,prevState) {
    const { isLoadingSaveImg,isLoadingDeleteSave } = this.props;
    if (prepProps.isLoadingSaveImg === false && isLoadingSaveImg === true) {
      let myColor = { background: '#0E1717', text: "#FFFFFF" };
      notify.show("Save successfully!", "custom", 5000, myColor);
    }
    if (prepProps.isLoadingDeleteSave === false && isLoadingDeleteSave === true) {
      let myColor = { background: '#0E1717', text: "#FFFFFF" };
      notify.show("Delete successfully!", "custom", 5000, myColor);
    }
  }

  render() {
    const {updateNav,queryTxt,topSearch, isAuthenticated } = this.props

    const userLinks = (
      <nav>
        <MenuLink to="/saves" label="My Board" updateNav={updateNav} className="tab"/>
        <button className="tab" onClick={this.handleLogout}>Logout</button>
      </nav>
    )
    const guestLinks = (
      <nav>
        <MenuLink to="/login" label="Login" updateNav={updateNav} className="tab"/>
        <MenuLink to="/Signup" label="Sign up now!" updateNav={updateNav} className="tab_signup"/>
      </nav>
    )


    return(
      <div>
      <Notifications />
      <MenuLink activeOnlyWhenExact={true} to="/" label="Gaze" updateNav={updateNav} className="tab_home"/>
      {topSearch && <div hidden className="top_search">    
        <input type="text" className="search_txt" name="query"          
          value={queryTxt}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          />
        <i className="fas fa-search"></i>
      </div>}
      { isAuthenticated ? userLinks : guestLinks}
    </div>
    )
  }
}

export default Nav;
