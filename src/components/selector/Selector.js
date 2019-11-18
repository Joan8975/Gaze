/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Selector.css';

export class Selector extends Component {

  componentDidMount(){
    const { currentImgId,getSingleImg} = this.props;
    getSingleImg(currentImgId)
  }
  // handleCreate = (e) => {
  //   this.setState({
  //     createName: e.target.value
  //   })
  // }

  render() {
    const { handleClose,currentImgId,singleImg,createName,handleCreate,handleEditMode,editMode} = this.props;

    const editCollection = (
      <div className="create_wrapper">
        <input className="add_input" placeholder="Create a collection" value={createName} onChange={handleCreate}/>
        <button className="submit_add"><i class="fas fa-check"></i></button>
      </div>
    )

    return (
    <Fragment>
    	<div className="selector_container">
    	  {singleImg && <img src={singleImg.urls.regular} alt="" /> }
    	  <div class="edit_collect">
    	    <div className="selector_title">Save to Collection</div>
            {!editMode? <button className="add_button" onClick={handleEditMode}>+ Create a new collection</button>:editCollection}
    	    <div className="all_collection">
            <div className="input_title">All Collections</div>
            <div className="item_group">
              <div className="item">name</div>
              <div className="item">name</div>
              <div className="item">name</div>
              <div className="item">name</div>
              <div className="item">name</div>
              <div className="item">name</div>

            </div>
          </div>
    	  </div>
    	</div>
    	<div className="selector_hover_layer" role="presentation" onClick={handleClose}></div>
    </Fragment>
    )
  }
}

export default Selector

