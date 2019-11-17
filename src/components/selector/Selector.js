/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Selector.css';

export class Selector extends Component {
  componentDidMount(){
    const { currentImgId,getSingleImg} = this.props;
    getSingleImg(currentImgId)
  }

  render() {
    const { handleClose,currentImgId,singleImg} = this.props;

    console.log('img='+singleImg)
    return (
    <div className="selector_hover_layer" role="presentation" onClick={handleClose}>
        <div className="selector_container">
          {singleImg && <img src={singleImg.urls.regular} alt="" /> }
        </div>
    </div>
    )
  }
}

export default Selector

