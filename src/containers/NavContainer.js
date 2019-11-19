import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/nav/Nav';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

const NavContainer = (props) => {
  return <Nav {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: text => dispatch(actions.updateNav(text)),
    query: text => dispatch(actions.query(text)),
    getImgsList: (page,query) => {
      dispatch(actions.getImgsList(page,query));
    },
    getSynonymList: (word) => {
      dispatch(actions.getSynonymList(word));
    },
    initImgs: array => {
      dispatch(actions.initImgs(array));
    },
    showTopSearch: (boolean) => {
      dispatch(actions.showTopSearch(boolean));
    },
    isLoggedIn: (boolean) => {
      dispatch(actions.checkLogin(boolean))
    }
  };
};
const mapStateToProps = (state) => {
  return {
    navText: state.nav.navText,
    queryTxt: state.posts.queryTxt,
    topSearch: state.posts.topSearch,
    isAuthenticated: state.posts.isAuthenticated,
    isLoadingSaveImg: state.posts.isLoadingSaveImg,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContainer));
