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
    // getAllCollections: (email) => {
    //   dispatch(actions.getAllCollections(email));
    // },
    // deleteSingleSave: (deleteSave) => {
    //   dispatch(actions.deleteSingleSave(deleteSave));
    // }

  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.posts.isAuthenticated,
    isLoadingCollectionSaves: state.posts.isLoadingCollectionSaves,
    collectionSaves: state.posts.collectionSaves,
    // isLoadingAllSaves: state.posts.isLoadingAllSaves,
    // allSaves: state.posts.allSaves,
    // allCollections: state.posts.allCollections,
    // isLoadingAllCollections: state.posts.isLoadingAllCollections,
    // isLoadingDeleteSave: state.posts.isLoadingDeleteSave,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)));
