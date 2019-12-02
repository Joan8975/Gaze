import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Collections from '../components/collections/Collections';
import * as actions from '../actions';

const CollectionsContainer = (props) => {
  return <Collections {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCollectionSaves: (email,collection) => {
      dispatch(actions.getCollectionSaves(email,collection));
    },
    deleteSingleSave: (deleteSave) => {
      dispatch(actions.deleteSingleSave(deleteSave));
    }
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.posts.isAuthenticated,
    isLoadingCollectionSaves: state.posts.isLoadingCollectionSaves,
    collectionSaves: state.posts.collectionSaves,
    isLoadingDeleteSave: state.posts.isLoadingDeleteSave,
    deleteSaveMsg: state.posts.deleteSaveMsg,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)));
