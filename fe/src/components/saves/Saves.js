import React, { Component,Fragment } from 'react'
import './Saves.css';
import Masonry from 'react-masonry-css'
import firebase from 'firebase';

export class Saves extends Component {
  constructor(props) {
    super(props);
    const { photoTab } = this.props;
    this.state = {
      photoTab, 
      showDeleteBtn: '',
    };
  }

  componentDidMount() {
    const { isAuthenticated, getAllSaves,getAllCollections,showTopSearch } = this.props;
    if(isAuthenticated) {
      getAllSaves(firebase.auth().currentUser.email)
      getAllCollections(firebase.auth().currentUser.email)
      showTopSearch(true);
    }
  }

  componentDidUpdate(prevProps,prevState) {
    const { history,isAuthenticated,getAllSaves,getAllCollections,isLoadingDeleteSave,isLoadingDeleteCollection } = this.props;
    if (prevProps.isAuthenticated === false && isAuthenticated === true) {
      getAllSaves(firebase.auth().currentUser.email)
      getAllCollections(firebase.auth().currentUser.email)
    }
    if (prevProps.isAuthenticated === true && isAuthenticated === false) {
      history.push('/')
    }
    // 先顯示已刪除通知再刷新
    this.timer = setTimeout(
      () => {
        if (prevProps.isLoadingDeleteSave === false && isLoadingDeleteSave === true) {
          window.location.reload();
        }
        if (prevProps.isLoadingDeleteCollection === false && isLoadingDeleteCollection === true) {
          window.location.reload();
        }
      },
      600,
    );
  }

  handleHoverOver(id){
    this.setState({
      showDeleteBtn: id,
    })
  }

  handleHoverOut = () => {
    this.setState({
      showDeleteBtn: ''
    })
  }

  handleDeleteImg(imgId, collection) {
    const { deleteSingleSave } = this.props;
    const deleteSave = {
      email: firebase.auth().currentUser.email,
      imgId,
      collection,
    }
    deleteSingleSave(deleteSave)
  }

  handleDeleteCollection(collection) {
    const { deleteSingleCollection } = this.props;
    const deleteCollection = {
      email: firebase.auth().currentUser.email,
      collection,
    }
    deleteSingleCollection(deleteCollection)
  }

  handleLogout = () => {
    this.props.isLoggedIn(false);
    firebase.auth().signOut()
  }

  render() {
    const { history,isAuthenticated,allSaves,allCollections}=this.props;
    const { photoTab,showDeleteBtn } = this.state;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    const photos = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {allSaves.message !== 'no content' && 
        allSaves.map((item, index) => {
        return (
          <Fragment>
              <div className="outter"
              onMouseOver={() => this.handleHoverOver(allSaves[index].id)}
              onMouseOut={this.handleHoverOut}>
                <button className={showDeleteBtn === allSaves[index].id? 'save_button':'hide_style'}
                onClick={() => this.handleDeleteImg(allSaves[index].imgId,allSaves[index].collection)} 
                ><i className="fas fa-trash-alt"></i></button>
                <li key={allSaves[index].imgId} role="presentation" onClick={() => history.push(`/images/${allSaves[index].imgId}`)} >
                  <div className="preview">
                    <div className={showDeleteBtn === allSaves[index].id ? 'hover_layer':'hide_style'}></div>
                    <img src={allSaves[index].content} alt="" />
                  </div>
                </li>
              </div>
          </Fragment>
        );
        })
      }
    </Masonry>
    )

    const collections = (
      <div className="item_group_m">
        {allCollections.message !== 'no content' &&
          allCollections.map((item, index) => {
            if (allCollections[index]) {
              return (
                <div className="item item_m"
                onMouseOver={() => this.handleHoverOver(item.collection)}
                onMouseOut={this.handleHoverOut}
                >
                  <button
                  className={showDeleteBtn === item.collection? 'save_button':'hide_style'}
                  onClick={() => this.handleDeleteCollection(item.collection)} 
                  ><i className="fas fa-trash-alt"></i></button>
                  <li onClick={() => history.push(`/collections/${item.collection}`)}>
                    {item.collection}
                    <img className="preview_img_m" src={item.content} alt="" />
                  </li>
                </div>
              )
            }
          })
        }
      </div>
    )

    return (
      <div className="container">
        <div className="profile">
          <div className="username">{isAuthenticated && firebase.auth().currentUser.displayName}
            <button className="logout_button" onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i>Logout</button>
          </div>
          <div className="profile_subtitle">Photos {allSaves.message !== "no content" ? allSaves.length : 0} | Collections {allSaves.message !== "no content" ? allCollections.length : 0}</div>
        </div>
        <div className="tab_bar">
          <button type="button" className={photoTab ? 'tab_item_active': 'tab_item'} onClick={() => history.push('/saves/photos')}>Photos</button>
          <button type="button" className={!photoTab ? 'tab_item_active': 'tab_item'} onClick={() => history.push('/saves/collections')}>Collections</button>
        </div>
        <ul>
          { photoTab ? photos : collections}
        </ul>
      </div>
    )
  }
}

export default Saves
