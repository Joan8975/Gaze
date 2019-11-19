/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Collection.css';
import Masonry from 'react-masonry-css'
import firebase from 'firebase';
import Loading from '../loading/Loading';


export class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTab: true, 
      showDeleteBtn: '',
    };
  }

  componentDidMount() {
    const { isAuthenticated, getAllSaves,getAllCollections } = this.props;
    this.timer = setTimeout(
      () => {
        if (isAuthenticated) {
          getAllSaves(firebase.auth().currentUser.email)
          getAllCollections(firebase.auth().currentUser.email)
        }
      },
      600,
    );
  }
  // 600 之後沒拿到更新的資料，在重新刷新後還是可以更新資料
  componentDidUpdate(prepProps,prevState) {
    const { isAuthenticated,getAllSaves,getAllCollections } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
      getAllSaves(firebase.auth().currentUser.email)
      getAllCollections(firebase.auth().currentUser.email)
    }
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

  handleDelete = ()  => {
    
  }



  render() {
    // console.log(firebase.auth().currentUser.email);
    const {isAuthenticated,allSaves,isLoadingAllCollections,allCollections}=this.props;
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
                <div class="outter"
                onMouseOver={() => this.handleHoverOver(allSaves[index].imgId)}
                onMouseOut={this.handleHoverOut}>
                  <button className={showDeleteBtn === allSaves[index].imgId? 'save_button':'hide_style'}
                  onClick={this.handleDelete} 
                  ><i class="fas fa-trash-alt"></i></button>
                  <li key={allSaves[index].imgId} role="presentation" >
                    <div className="preview">
                      <div className={showDeleteBtn === allSaves[index].imgId ? 'hover_layer':'hide_style'}></div>
                      <img src={allSaves[index].content} alt="" />
                    </div>
                  </li>
                </div>
            </Fragment>
          );
        }
        )
      }
    </Masonry>
    )

    const collections = (
      <div className="item_group_m">
        {!isLoadingAllCollections ?
          allCollections.map((item, index) => {
            if (allCollections[index]) {
              return (
                <li className="item item_m" onClick={() => this.handleSave(item.collection)}>{item.collection}
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

export default Collection
