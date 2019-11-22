/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { withRouter } from 'react-router-dom';
import Loading from '../loading/Loading';
import Masonry from 'react-masonry-css';
import Fade from 'react-reveal/Fade';
import Selector from '../../containers/SelectorContainer'

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
      showAddBtn: '',
      showSelector: false,
      urlImgId: this.props.match.params.imgId,
    };
    const {initImgs } = this.props;
    initImgs([]);
  }

  componentDidMount() {
    const { urlImgId } = this.state;
    const { getSingleImg } = this.props;
    getSingleImg(urlImgId );
  }

  componentDidUpdate(prevProps,prevState) {
    const { urlImgId } = this.state;
    const { isLoadingSingleImg,getImgsList,singleImg,getSingleImg } = this.props;
    if (prevProps.isLoadingSingleImg === true && isLoadingSingleImg === false) {
      getImgsList(1,singleImg.tags[0].title)
    }
    if (prevState.urlImgId !== urlImgId) {
      getSingleImg(urlImgId );
    }
  }

  handleHoverOver(id){
    this.setState({
      showAddBtn: id,
    })
  }

  handleHoverOut = () => {
    this.setState({
      showAddBtn: ''
    })
  }


  handleSumbit(id) {
    const {history} =  this.props
    this.setState({
      urlImgId: id,
    })
    
    history.push(`/images/${id}`)
  }


  render() {
    const { page,hasMore,currentImgId,showSelector,showAddBtn,createName,editMode} = this.state;

    const { singleImg, isLoadingSingleImg,history,imgs,isLoadingGetImgs,isAuthenticated }= this.props;
    const breakpointColumnsObj = {
      default: 4,
      1100: 2,
      700: 1
    };
    
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
                    {singleImg.tags.map((item, index) => {
                        if ( index > 0 && index < 7  && singleImg.tags[index]) {
                          return (
                            <li className="single_tag" style={{ backgroundColor: [singleImg.color]}}
                            onClick={() => history.push(`/search/${singleImg.tags[index].title}`)}>{singleImg.tags[index].title}</li>
                          )
                        }
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div class="related_images">
              <ul>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {(!isLoadingGetImgs)
                    ? imgs.map((item, index) => {
                      if (imgs[index]) {
                        return (
                          <div className="outter"                           
                            onMouseOver={() => this.handleHoverOver(imgs[index].id)}
                            onMouseOut={this.handleHoverOut}
                          >
                            <Fade bottom duration={600} >
                              <li key={imgs[index].id} role="presentation" 
                              onClick={() => this.handleSumbit(imgs[index].id)}>
                                <div className={showAddBtn === imgs[index].id? 'hover_layer':'hide_style'}></div>
                                <img src={imgs[index].urls.regular} alt="" />
                              </li>
                            </Fade>
                          </div>
                        );
                      }
                    })
                    : <Loading />}
                </Masonry>
                {/* {isLoadingGetImgs || isLoadingRandomImgs ? <Loading /> : <div className="clearfix" />}
                {totalPage === 0 && <div>Keywords not found, try different </div>}
                {page === totalPage && <div>no content</div>} */}
                <div className="clearfix" />
              </ul>
            </div>
          </div>
          : <Loading />}
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
