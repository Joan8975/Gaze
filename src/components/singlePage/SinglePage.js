/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { withRouter } from 'react-router-dom';
import Loading from '../loading/Loading';

class SinglePage extends Component {
  constructor(props) {
    super(props);
    const {initImgs } = this.props;
    initImgs([]);
  }

  componentDidMount() {
    const { getSingleImg } = this.props;
    const {
      match: {
        params: {
          imgId,
        },
      },
    } = this.props;
    getSingleImg(imgId);
  }

  render() {
    const { singleImg, isLoadingSingleImg }= this.props;
    console.log(singleImg);
    
    return (
      <Fragment>
        {!isLoadingSingleImg && singleImg
          ? 
          <div className="container">
            <div className="single_container">
              <img className="single_img" src={singleImg.urls.regular} alt=""/>
              <div className="single_info">
                <button className='save_button_dark'><i class="fas fa-plus"></i></button>
                <button className='download_button'>Download</button>
                <div class="tag_group">
                  <p className="subtitle">Uploaded by</p>
                  <div className="creater">
                    <img className="create_profile" src={singleImg.user.profile_image.medium} alt="" />
                    <p className="creater_name">{singleImg.user.name}</p>
                  </div>
                  <p className="subtitle">Related tags</p>
                  <ul>
                    {!isLoadingSingleImg &&
                      singleImg.tags.map((item, index) => {
                        if ( index > 0 && index < 7  && singleImg.tags[index]) {
                          return (
                            <li className="single_tag" style={{ backgroundColor: [singleImg.color]}}>{singleImg.tags[index].title}</li>
                          )
                        }
                      })
                    }
                  </ul>
                  <ul>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
          : <Loading />}
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
