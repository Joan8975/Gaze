import React from 'react';
import { connect } from 'react-redux';
import App from '../App';
import * as actions from '../actions';

const AppContainer = (props) => {
  return <App {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (boolean) => {
      dispatch(actions.checkLogin(boolean))
    }
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.posts.isAuthenticated
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
