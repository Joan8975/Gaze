import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Collection from '../components/collection/Collection';
import * as actions from '../actions';

const CollectionContainer = (props) => {
  return <Collection {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSaves: (email) => {
      dispatch(actions.getAllSaves(email));
    },
    getAllCollections: (email) => {
      dispatch(actions.getAllCollections(email));
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
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)));
