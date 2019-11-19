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
    // getAllSaves: (email) => {
    //   dispatch(actions.getAllSaves(email));
    // },
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
    // isAuthenticated: state.posts.isAuthenticated,
    // isLoadingAllSaves: state.posts.isLoadingAllSaves,
    // allSaves: state.posts.allSaves,
    // allCollections: state.posts.allCollections,
    // isLoadingAllCollections: state.posts.isLoadingAllCollections,
    // isLoadingDeleteSave: state.posts.isLoadingDeleteSave,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CollectionsContainer)));
