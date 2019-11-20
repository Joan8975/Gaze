/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Saves.css';
import Masonry from 'react-masonry-css'
import firebase from 'firebase';
import Loading from '../loading/Loading';


export class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTab: true, 
      showDeleteBtn: '',
    };
  }
  //沒刷新跑這邊，每一次進來都會做
  componentDidMount() {
    const { isAuthenticated, getAllSaves,getAllCollections } = this.props;
    if(isAuthenticated) {
      getAllSaves(firebase.auth().currentUser.email)
      getAllCollections(firebase.auth().currentUser.email)
    }

    //延遲一秒讓 firebase 先抓到資料，以下設定就可以不用寫 componentDidUpdate
    // this.timer = setTimeout(
    //   () => {
    //     if(firebase.auth().currentUser) {
    //       getAllSaves(firebase.auth().currentUser.email)
    //       getAllCollections(firebase.auth().currentUser.email)
    //     }
    //   },
    //   1000,
    // );

  }
  // 有刷新跑這邊，isAuthenticated state 有改變才做
  componentDidUpdate(prepProps,prevState) {
    const { isAuthenticated,getAllSaves,getAllCollections,isLoadingDeleteSave } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
      getAllSaves(firebase.auth().currentUser.email)
      getAllCollections(firebase.auth().currentUser.email)
    }
    // 先顯示已刪除通知再刷新
    this.timer = setTimeout(
      () => {
        if (prepProps.isLoadingDeleteSave === false && isLoadingDeleteSave === true) {
          window.location.reload();
        }
      },
      600,
    );
  }

  handleTab = (e) => {
    this.setState({
      photoTab: e.target.name === 'photos'
    })
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

  handleDelete(imgId, collection) {
    const { deleteSingleSave } = this.props;
    const deleteSave = {
      email: firebase.auth().currentUser.email,
      imgId,
      collection,
    }
    deleteSingleSave(deleteSave)
  }


  render() {
    const { history,isAuthenticated,allSaves,isLoadingAllCollections,allCollections}=this.props;
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
      {allSaves.map((item, index) => {
        return (
          <Fragment>
              <div className="outter"
              onMouseOver={() => this.handleHoverOver(allSaves[index].imgId)}
              onMouseOut={this.handleHoverOut}>
                <button className={showDeleteBtn === allSaves[index].imgId? 'save_button':'hide_style'}
                onClick={() => this.handleDelete(allSaves[index].imgId,allSaves[index].collection)} 
                ><i className="fas fa-trash-alt"></i></button>
                <li key={allSaves[index].imgId} role="presentation" >
                  <div className="preview">
                    <div className={showDeleteBtn === allSaves[index].imgId ? 'hover_layer':'hide_style'}></div>
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
        {!isLoadingAllCollections ?
          allCollections.map((item, index) => {
            if (allCollections[index]) {
              return (
                <li className="item item_m" onClick={() => history.push(`/collections/${item.collection}`)}>{item.collection}
                  <img className="preview_img_m" src={item.content} alt="" />
                </li>
              )
            }
          })
        :<Loading />}
      </div>
    )

    return (
      <div className="container">
        <div className="profile">
          <div className="username">{isAuthenticated && firebase.auth().currentUser.displayName}</div>
          <div className="profile_subtitle">Photos {allSaves.length} | Collections {allCollections.length}</div>
        </div>
        <div className="tab_bar">
          <button type="button" className={photoTab ? 'tab_item_active': 'tab_item'} name="photos" onClick={this.handleTab}>Photos</button>
          <button type="button" className={!photoTab ? 'tab_item_active': 'tab_item'} name="collections" onClick={this.handleTab}>Collections</button>
        </div>
        <ul>
          { photoTab ? photos : collections}
        </ul>
      </div>
    )
  }
}

export default Saves
