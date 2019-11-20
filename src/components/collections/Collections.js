/* jsx-a11y/no-static-element-interactions */
import React, { Component,Fragment } from 'react'
import './Collections.css';
import Masonry from 'react-masonry-css'
import firebase from 'firebase';
import Loading from '../loading/Loading';

export class Collections extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
      params: {
        collectionName,
      },
      },
      } = this.props;
    this.state = {
      currentCollection: decodeURI(collectionName),
    };
  }

  componentDidMount() {
    const { isAuthenticated, getCollectionSaves} = this.props;
    const { currentCollection } = this.state;
    if (isAuthenticated) {
      getCollectionSaves(firebase.auth().currentUser.email,currentCollection)
    }
  }

  componentDidUpdate(prepProps,prevState) {
    const { currentCollection } = this.state;
    const email = firebase.auth().currentUser.email
    const { isAuthenticated,getCollectionSaves } = this.props;
    if (prepProps.isAuthenticated === false && isAuthenticated === true) {
      getCollectionSaves(email,currentCollection)
    }
  }

  render() {
    const { isAuthenticated,collectionSaves } = this.props;
    const { currentCollection } = this.state;
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
                  // onMouseOver={() => this.handleHoverOver(collectionSaves[index].imgId)}
                  // onMouseOut={this.handleHoverOut}
                  >
                    {/* <button className={showDeleteBtn === allSaves[index].imgId? 'save_button':'hide_style'}
                    onClick={() => this.handleDelete(allSaves[index].imgId,allSaves[index].collection)} 
                    ><i className="fas fa-trash-alt"></i></button> */}
                    <li key={collectionSaves[index].imgId} role="presentation" >
                      <div className="preview">
                        {/* <div className={showDeleteBtn === allSaves[index].imgId ? 'hover_layer':'hide_style'}></div> */}
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
