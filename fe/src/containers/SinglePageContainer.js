import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SinglePage from '../components/singlePage/SinglePage';
import * as actions from '../actions';

const SinglePageContainer = (props) => {
  return <SinglePage {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleImg: (imgId) => {
      dispatch(actions.getSingleImg(imgId));
    },
    initImgs: array => {
      dispatch(actions.initImgs(array));
    },
    getImgsList: (page,query) => {
      dispatch(actions.getImgsList(page,query));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    imgs: state.posts.imgs,
    singleImg: state.posts.singleImg,
    isLoadingSingleImg: state.posts.isLoadingSingleImg,
    isLoadingGetImgs: state.posts.isLoadingGetImgs,
    isLoadingSaveImg: state.posts.isLoadingSaveImg,
    totalPage: state.posts.totalPage,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SinglePageContainer)));
