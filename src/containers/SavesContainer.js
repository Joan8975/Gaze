import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Saves from '../components/saves/Saves';
import * as actions from '../actions';

const SavesContainer = (props) => {
  return <Saves {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSaves: (email) => {
      dispatch(actions.getAllSaves(email));
    },
    getAllCollections: (email) => {
      dispatch(actions.getAllCollections(email));
    },
    deleteSingleSave: (deleteSave) => {
      dispatch(actions.deleteSingleSave(deleteSave));
    },
    showTopSearch: (boolean) => {
      dispatch(actions.showTopSearch(boolean));
    },
    isLoggedIn: (boolean) => {
      dispatch(actions.checkLogin(boolean))
    },
    deleteSingleCollection: (deleteCollection) => {
      dispatch(actions.deleteSingleCollection(deleteCollection));
    },

  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.posts.isAuthenticated,
    isLoadingAllSaves: state.posts.isLoadingAllSaves,
    allSaves: state.posts.allSaves,
    allCollections: state.posts.allCollections,
    isLoadingAllCollections: state.posts.isLoadingAllCollections,
    isLoadingDeleteSave: state.posts.isLoadingDeleteSave,
    isLoadingDeleteCollection: state.posts.isLoadingDeleteCollection,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SavesContainer)));
