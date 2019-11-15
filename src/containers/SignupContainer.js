import React from 'react';
import { connect } from 'react-redux';
import Signup from '../components/signup/Signup';
import * as actions from '../actions';

const SignupContainer = (props) => {
  return <Signup {...props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
