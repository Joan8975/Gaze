import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/login/Login';
import * as actions from '../actions';

const LoginContainer = (props) => {
  return <Login {...props} />;
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
