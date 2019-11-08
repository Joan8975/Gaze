import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddPost from '../components/addPost/AddPost';
import * as actions from '../actions';

const AddPostContainer = (props) => {
  return <AddPost {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCreatePost: (author, title, body) => {
      dispatch(actions.getCreatePost(author, title, body));
    },
    fieldInvalid: array => dispatch(actions.fieldInvalid(array)),
    fieldAuthor: text => dispatch(actions.fieldAuthor(text)),
    fieldTitle: text => dispatch(actions.fieldTitle(text)),
    fieldBody: text => dispatch(actions.fieldBody(text)),
  };
};
const mapStateToProps = (state) => {
  return {
    invalidInput: state.fields.invalidInput,
    author: state.fields.author,
    title: state.fields.title,
    body: state.fields.body,
    isLoadingCreatePost: state.posts.isLoadingCreatePost,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(AddPostContainer)));
