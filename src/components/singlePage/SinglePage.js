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
      page: 1, // 目前的頁碼
      hoveredImg: '',
      previewId:'',
      currentImgId: this.props.match.params.imgId,
    };
    const {initImgs } = this.props;
    initImgs([]);
  }

  componentDidMount() {
    const { currentImgId } = this.state;
    const { getSingleImg } = this.props;
    getSingleImg(currentImgId );
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps,prevState) {
    const { currentImgId } = this.state;
    const { isLoadingSingleImg,getImgsList,singleImg,getSingleImg,isLoadingSaveImg } = this.props;
    if (prevProps.isLoadingSingleImg === true && isLoadingSingleImg === false) {
      getImgsList(1,singleImg.tags[0].title)
    }
    if (prevState.currentImgId !== currentImgId) {
      getSingleImg(currentImgId );
    }
    if (prevProps.isLoadingSaveImg === true && isLoadingSaveImg === false) {
      this.setState({
        showSelector:false,
      })
      document.body.style.overflow = "visible"
    }
  }

  // handleScroll = e => {
  //   // 下拉加載
  //   const bottomLength = document.body.clientHeight-document.documentElement.scrollTop;
  //   console.log(bottomLength);
  //   if (bottomLength < 500) {
  //     const { page } = this.state;
  //     const { getImgsList,singleImg,totalPage} = this.props;
  //     if(totalPage !== 0 && page !== totalPage){
  //       getImgsList(page + 1, singleImg.tags[0].title)
  //       this.setState((prevState) => ({
  //         page: prevState.page + 1,
  //       }))
  //     }
  //   }
  // }

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
    
    return (
      <Fragment>
        {showSelector && <Selector showSelector = {true}  previewId={previewId} 
        handleClose={this.handleClose}/>}
        {!isLoadingSingleImg && singleImg.urls
          ? 
          <div className="container">
            <div className="single_container">
              <img className="single_img" src={singleImg.urls.regular} alt=""/>
              <div className="single_info">
                <button className='save_button_dark' onClick={isAuthenticated ? () => this.handleSelector(singleImg.id) : ()=> history.push('/login')}><i class="fas fa-plus"></i></button>
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
                    })
                    : <Loading />}
                </Masonry>
                {isLoadingGetImgs && <Loading />}
                {totalPage === 0 && <div className="empt_notice">No results found, please try different keyword.</div>}
                {page === totalPage && <div className="empt_notice">{`${page} / ${totalPage}`}</div>}
              </ul>
            </div>
          </div>
          : <Loading />}
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
