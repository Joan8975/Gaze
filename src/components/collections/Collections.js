/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import Masonry from 'react-masonry-css'
import firebase from 'firebase';
import Loading from '../loading/Loading';

export class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCollection: decodeURI(this.props.match.params.collectionName),
      showDeleteBtn: '',
    };
  }

  componentDidMount() {
    const { currentCollection } = this.state;
    const { isAuthenticated, getCollectionSaves} = this.props;
    if (isAuthenticated) {
      getCollectionSaves(firebase.auth().currentUser.email,currentCollection)
    }
  }

  componentDidUpdate(prepProps,prevState) {
    const { currentCollection } = this.state;
    const { history,isAuthenticated,getCollectionSaves,isLoadingDeleteSave,deleteSaveMsg } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
      getCollectionSaves(firebase.auth().currentUser.email,currentCollection)
    }
    if (prepProps.isAuthenticated === true && isAuthenticated === false) {
      history.push('/')
    }
    // 先顯示已刪除通知再刷新
    this.timer = setTimeout(
      () => {
        if (prepProps.isLoadingDeleteSave === false && isLoadingDeleteSave === true) {
          if(deleteSaveMsg === '') {
            window.location.reload();
          }
          history.goBack()
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
    const { isAuthenticated,collectionSaves,history } = this.props;
    const { currentCollection,showDeleteBtn } = this.state;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };

    return (
      <div className="container">
        <div className="profile">
          <div className="username">{isAuthenticated && currentCollection}</div>
          <div className="profile_subtitle">Photos {collectionSaves.length}</div>
        </div>
        <ul>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {collectionSaves.map((item, index) => {
            return (
              <Fragment>
                  <div className="outter"
                  onMouseOver={() => this.handleHoverOver(collectionSaves[index].id)}
                  onMouseOut={this.handleHoverOut}
                  >
                    <button className={showDeleteBtn === collectionSaves[index].id? 'save_button':'hide_style'}
                    onClick={() => this.handleDelete(collectionSaves[index].imgId,currentCollection)} 
                    ><i className="fas fa-trash-alt"></i></button>
                    <li key={collectionSaves[index].imgId} role="presentation" onClick={() => history.push(`/images/${collectionSaves[index].imgId}`)}>
                      <div className="preview">
                        <div className={showDeleteBtn === collectionSaves[index].id ? 'hover_layer':'hide_style'}></div>
                        <img src={collectionSaves[index].content} alt="" />
                      </div>
                    </li>
                  </div>
              </Fragment>
            );
            })
          }
        </Masonry>
        </ul>
      </div>
    )
  }
}

export default Collections
