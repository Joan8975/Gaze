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
      hoveredImg: '',
      previewId:'',
      currentImgId: this.props.match.params.imgId,
    };
    const { initImgs } = this.props;
    initImgs([]);
  }

  componentDidMount() {
    const { currentImgId } = this.state;
    const { getSingleImg } = this.props;
    getSingleImg(currentImgId );
  }

  componentDidUpdate(prevProps,prevState) {
    const { currentImgId } = this.state;
    const { isLoadingSingleImg,getImgsList,singleImg,getSingleImg,isLoadingSaveImg,initImgs } = this.props;
    if (prevProps.isLoadingSingleImg === true && isLoadingSingleImg === false) {
      window.scrollTo(0,0);
      if (singleImg.tags[0]) getImgsList(1, singleImg.tags[0].title);
    }
    if (prevState.currentImgId !== currentImgId) {
      window.location.reload()
    }
    if (prevProps.isLoadingSaveImg === true && isLoadingSaveImg === false) {
      this.setState({
        showSelector:false,
      })
      document.body.style.overflow = "visible"
    }
  }

  handleHoverOver(id){
    this.setState({
      hoveredImg: id,
    })
  }

  handleHoverOut = () => {
    this.setState({
      hoveredImg: ''
    })
  }

  handleSumbit(id) {
    const {history} =  this.props
    this.setState({
      currentImgId: id,
    })
    history.push(`/images/${id}`)
  }

  handleSelector(id){
    this.setState({
      previewId: id,
      showSelector: true,
    })
    document.body.style.overflow = "hidden"
  }

  handleClose = () => {
    this.setState({
      showSelector:false,
    })
    document.body.style.overflow = "visible"
  }

  render() {
    const { page,hasMore,previewId,showSelector,hoveredImg,createName,editMode} = this.state;

    const { singleImg, isLoadingSingleImg,history,imgs,isLoadingGetImgs,isAuthenticated,totalPage }= this.props;
    const breakpointColumnsObj = {
      default: 4,
      1100: 2,
      700: 1
    };
    
    const singlePhoto = (
      <Fragment>
        {!isLoadingSingleImg && singleImg.urls ?
          <div className="single_container">
            <img className="single_img" src={singleImg.urls.regular} alt=""/>
            <div className="single_info">
              <button className='save_button_dark' onClick={isAuthenticated ? () => this.handleSelector(singleImg.id) : ()=> history.push('/login')}><i class="fas fa-plus"></i></button>
              <div class="tag_group">
                <p className="subtitle">Uploaded by</p>
                <div className="creater">
                  <img className="create_profile" src={singleImg.user.profile_image.medium} alt="" />
                  <p className="creater_name">{singleImg.user.name}</p>
                </div>
                {singleImg.tags.length ? 
                <div>
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
                : null}
              </div>
            </div>
          </div>
        : <Loading />}
      </Fragment>
    );

    const relatedImg = (
      <ul className="related_images">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {imgs ? imgs.map((item, index) => {
            if (imgs[index]) {
              return (
                <div className="outter"                           
                  onMouseOver={() => this.handleHoverOver(imgs[index].id)}
                  onMouseOut={this.handleHoverOut}
                >
                  <button className={hoveredImg === imgs[index].id? 'save_button':'hide_style'} 
                  onClick={isAuthenticated ? () => this.handleSelector(imgs[index].id) : ()=> history.push('/login')}><i class="fas fa-plus"></i></button>

                  <Fade bottom duration={600} >
                    <li key={imgs[index].id} role="presentation" 
                    onClick={() => this.handleSumbit(imgs[index].id)}>
                      <div className={hoveredImg === imgs[index].id? 'hover_layer':'hide_style'}></div>
                      <img src={imgs[index].urls.regular} alt="" />
                    </li>
                  </Fade>
                </div>
              );
            }
          }): <Loading />}
        </Masonry>
      </ul>
    )
    
    return (
      <Fragment>
        {showSelector && (
          <Selector
            showSelector={true}
            previewId={previewId}
            handleClose={this.handleClose}
          />
        )}
        <div className="container">
          {singlePhoto}
          {imgs.length ? <p className="related_title">More Like this</p>: null}
          {imgs.length ? relatedImg : null}
        </div>
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
