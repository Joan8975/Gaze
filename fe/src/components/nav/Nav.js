import React, { Component,Fragment }  from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom';
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
  
  componentDidUpdate(prevProps,prevState) {
    const { isLoadingSaveImg,isLoadingDeleteSave,isLoadingDeleteCollection} = this.props;
    if (prevProps.isLoadingSaveImg === false && isLoadingSaveImg === true) {
      let myColor = { background: "#d6bb8b", text: "#FFFFFF" };
      notify.show("Saved successfully!", "custom", 2000, myColor);
    }
    if (prevProps.isLoadingDeleteSave === false && isLoadingDeleteSave === true) {
      let myColor = { background: '#d6bb8b', text: "#FFFFFF" };
      notify.show("Deleted successfully", "custom", 2000, myColor);
    }
    if (prevProps.isLoadingDeleteCollection === false && isLoadingDeleteCollection === true) {
      let myColor = { background: '#d6bb8b', text: "#FFFFFF" };
      notify.show("Deleted successfully", "custom", 2000, myColor);
    }
  }

  render() {
    const {updateNav,queryTxt,topSearch, isAuthenticated } = this.props
    const userLinks = (
      <nav>
        <MenuLink activeOnlyWhenExact={true} to="/" label="Home" updateNav={updateNav} className="tab"/>
        <MenuLink to="/saves/photos" label="My Board" updateNav={updateNav} className="tab"/>
      </nav>
    )
    const guestLinks = (
      <nav>
        <MenuLink to="/login" label="Login" updateNav={updateNav} className="tab"/>
        <MenuLink to="/Signup" label="Sign up now!" updateNav={updateNav} className="tab_signup"/>
      </nav>
    )
    return(
      <Fragment>
        <Notifications />
        <div className="nav_bar">
          <MenuLink activeOnlyWhenExact={true} to="/" updateNav={updateNav} className="tab_home"/>
          {topSearch && 
          <div hidden className="top_search">    
            <input type="text" className="search_txt" name="query"          
              value={queryTxt}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              />
            <i className="fas fa-search"></i>
          </div>}
          { isAuthenticated ? userLinks : guestLinks}
        </div>
      </Fragment>
    )
  }
}

export default Nav;
