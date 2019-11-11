/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component }  from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact, updateNav,className }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={`${className} ${match ? 'tab_active' : ''}`} to={to} onClick={() => updateNav(to)}>{label}</Link>
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

  render() {
    const {updateNav,queryTxt,topSearch} = this.props
    return(
      <div>
      <MenuLink activeOnlyWhenExact={true} to="/" label="Gaze" updateNav={updateNav} className="tab_home"/>
      {topSearch && <div hidden className="top_search">    
        <input type="text" className="search_txt" name="query"          
          value={queryTxt}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          />
        <i className="fas fa-search"></i>
      </div>}
      <nav>
        <MenuLink to="/addPost" label="Add" updateNav={updateNav} className="tab"/>
        <MenuLink to="/Login" label="Login" updateNav={updateNav} className="tab"/>
      </nav>
    </div>
    )
  }
}

export default Nav;
