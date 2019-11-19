import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/home/Home';
import * as actions from '../actions';

const HomeContainer = (props) => {
  return <Home {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImgsList: (page,query) => {
      dispatch(actions.getImgsList(page,query));
    },
    getRandomImgs: (page) => {
      dispatch(actions.getRandomImgs(page));
    },
    getSynonymList: (word) => {
      dispatch(actions.getSynonymList(word));
    },
    initImgs: array => {
      dispatch(actions.initImgs(array));
    },
    query: text => dispatch(actions.query(text)),
    showTopSearch: (boolean) => {
      dispatch(actions.showTopSearch(boolean))
    },
    getSingleImg: (imgId) => {
      dispatch(actions.getSingleImg(imgId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    isLoadingGetImgs: state.posts.isLoadingGetImgs,
    isLoadingRandomImgs: state.posts.isLoadingRandomImgs,
    imgs: state.posts.imgs,
    totalPage: state.posts.totalPage,
    queryTxt: state.posts.queryTxt,
    isLoadingSynonym: state.posts.isLoadingSynonym,
    syn: state.posts.syn,
    topSearch: state.posts.topSearch,
    isAuthenticated: state.posts.isAuthenticated,
    singleImg: state.posts.singleImg,
    isLoadingSaveImg: state.posts.isLoadingSaveImg,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
