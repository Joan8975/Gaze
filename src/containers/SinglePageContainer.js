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
    getSinglePost: (postId) => {
      dispatch(actions.getSinglePost(postId));
    },
    getImgsList: page => {
      dispatch(actions.getImgsList(page));
    },
    getUpdatePost: (postId, author, title, body) => {
      dispatch(actions.getUpdatePost(postId, author, title, body));
    },
    getDeletePost: postId => {
      dispatch(actions.getDeletePost(postId));
    },
    fieldInvalid: array => {
      dispatch(actions.fieldInvalid(array));
    },
    initImgs: array => {
      dispatch(actions.initImgs(array));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    invalidInput: state.fields.invalidInput,
    author: state.fields.author,
    title: state.fields.title,
    body: state.fields.body,
    imgs: state.posts.imgs,
    singlePost: state.posts.posts,
    isLoadingGetImgs: state.posts.isLoadingGetImgs,
    isLoadingUpdatePost: state.posts.isLoadingUpdatePost,
    isLoadingDeletePost: state.posts.isLoadingDeletePost,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SinglePageContainer)));
