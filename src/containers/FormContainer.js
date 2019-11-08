import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Form from '../components/form/Form';
import { fieldInvalid, fieldAuthor, fieldBody, fieldTitle } from '../actions';

const FormContainer = (props) => {
  return <Form {...props} />;
};

const mapDispatchToProps = (dispatch) => { // [做什麼 action + 跟 state tree 同步]跟 action 是一組的
  return {
    fieldInvalid: array => dispatch(fieldInvalid(array)),
    fieldAuthor: text => dispatch(fieldAuthor(text)),
    fieldTitle: text => dispatch(fieldTitle(text)),
    fieldBody: text => dispatch(fieldBody(text)),
  };
};
const mapStateToProps = (state) => { // [在哪裡實現效果] mapStateToProps 用來告訴需要哪些 state，變成 props 傳下去
  return {
    invalidInput: state.fields.invalidInput,
    author: state.fields.author,
    title: state.fields.title,
    body: state.fields.body,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(FormContainer)));
