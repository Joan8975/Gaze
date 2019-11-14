/* jsx-a11y/no-static-element-interactions */
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { Textbox } from "react-inputs-validation";


import React, { Component,Fragment } from 'react'
import './TextField.css';

export class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hasEmailError: true,
      hasPasswordError: true,
      emailErrorMsg: "",
      passwordErrorMsg: "",
      isSubmitting: false
    };
  }
  render() {
    return (
      <Fragment>
        <Textbox
          attributesInput={{
            placeholder: "enter the account",
            type: "text"
          }}
          customStyleWrapper={{ height: "100%" }}
          customStyleContainer={{ height: "100%" }}
          customStyleInput={{
            paddingTop: "0",
            paddingBottom: "0",
            height: "45px",
            paddingLeft: "20px",
            paddingRight: "0px",
            border: "none",
            textAlign: "right"
          }}
          value={account}
          onChange={this.handleAccountChange}
          onBlur={() => {}}
          validationOption={{
            check: false
          }}
        />
        {accountErrorMsg == "" ? ( "") : (
          <div className="errorMsg">{accountErrorMsg}</div>
        )}
      </Fragment>
    )
  }
}

export default TextField


