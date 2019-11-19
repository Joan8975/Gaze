import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Selector from '../components/selector/Selector';
import * as actions from '../actions';

const SelectorContainer = (props) => {
  return <Selector {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return { 
    getAllCollections: (email) => {
      dispatch(actions.getAllCollections(email));
    },
    saveNewImg: (newSave) => {
      dispatch(actions.saveNewImg(newSave));
    },

  };
};
const mapStateToProps = (state) => {
  return {
    allCollections: state.posts.allCollections,
    isLoadingAllCollections: state.posts.isLoadingAllCollections,
    isLoadingSaveImg: state.posts.isLoadingSaveImg,

  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SelectorContainer)));
