/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React, { Component, Fragment }  from 'react';
import './Selector.css';
import firebase from 'firebase';
import Loading from '../loading/Loading';

export class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createName:'',
      editMode: false,
    };
  }
  

  componentDidMount(){
    const { previewId,getPreviewImg,getAllCollections} = this.props;
    getPreviewImg(previewId)
    getAllCollections(firebase.auth().currentUser.email)

  }


  handleSave(collection){
    const { saveNewImg, previewId, previewImg } = this.props;
    const newSave = { 
      email: firebase.auth().currentUser.email,
      imgId: previewId,
      content: previewImg.urls.regular,
      collection,
    }
    saveNewImg(newSave)
  }

  handleNewSave = () => {
    const { createName } = this.state;
    const { saveNewImg, previewId, previewImg } = this.props;
    const newSave = { 
      email: firebase.auth().currentUser.email,
      imgId: previewId,
      content: previewImg.urls.regular,
      collection: createName,
    }
    if (createName !== '') {
      saveNewImg(newSave)
    }
  }

  handleCreate = (e) => {
    this.setState({
      createName: e.target.value
    })
  }

  handleEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  render() {
    const { handleClose,previewImg,allCollections} = this.props;
    const { createName,editMode } = this.state;

    const editCollection = (
      <div className="create_wrapper">
        <input className="add_input" placeholder="Create a collection" value={createName} onChange={this.handleCreate}/>
        <button type="submit" className="submit_add" onClick={this.handleNewSave}><i class="fas fa-check"></i></button>
      </div>
    )
    return (
    <Fragment>
    	<div className="selector_container">
    	  {previewImg.urls && <img className="preview_img_l" src={previewImg.urls.regular} alt="" />}
    	  <div class="edit_collect">
    	    <div className="selector_title">Save to Collection</div>
            {!editMode? <button className="add_button" onClick={this.handleEditMode}>+ Create a new collection</button>:editCollection}
    	    <div className="all_collection">
            <div className="input_title">All Collections</div>
            <div className="item_group_s">
            {allCollections.message !== 'no content' ?
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

