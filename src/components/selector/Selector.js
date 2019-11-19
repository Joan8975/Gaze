/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Selector.css';
import firebase from 'firebase';
import Loading from '../loading/Loading';

export class Selector extends Component {

  componentDidMount(){
    const { currentImgId,getSingleImg,getAllCollections} = this.props;
    getSingleImg(currentImgId)
    getAllCollections(firebase.auth().currentUser.email)
  }


  handleSave(collection){
    const { saveNewImg, currentImgId, singleImg } = this.props;
    const newSave = { 
      email: firebase.auth().currentUser.email,
      imgId: currentImgId,
      content: singleImg.urls.regular,
      collection,
    }
    saveNewImg(newSave)
  }

  handleNewSave = () => {
    const { saveNewImg, currentImgId, singleImg,createName } = this.props;
    const newSave = { 
      email: firebase.auth().currentUser.email,
      imgId: currentImgId,
      content: singleImg.urls.regular,
      collection: createName,
    }
    if (createName !== '') {
      saveNewImg(newSave)
    }
  }

  render() {
    const { handleClose,singleImg,createName,handleCreate,handleEditMode,editMode, isLoadingAllCollections,allCollections} = this.props;

    const editCollection = (
      <div className="create_wrapper">
        <input className="add_input" placeholder="Create a collection" value={createName} onChange={handleCreate}/>
        <button type="submit" className="submit_add" onClick={this.handleNewSave}><i class="fas fa-check"></i></button>
      </div>
    )
    return (
    <Fragment>
    	<div className="selector_container">
    	  {singleImg && <img className="preview_img_l" src={singleImg.urls.regular} alt="" /> }
    	  <div class="edit_collect">
    	    <div className="selector_title">Save to Collection</div>
            {!editMode? <button className="add_button" onClick={handleEditMode}>+ Create a new collection</button>:editCollection}
    	    <div className="all_collection">
            <div className="input_title">All Collections</div>
            <div className="item_group_s">
            {!isLoadingAllCollections ?
              allCollections.map((item, index) => {
                if (allCollections[index]) {
                  return (
                    <div className="item item_s" onClick={() => this.handleSave(item.collection)}>{item.collection}
                      <img className="preview_img_s" src={item.content} alt="" />
                    </div>
                  )
                }
              })
            :<Loading />}
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

