/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './Home.css';
import Search from '../search/Search'
import Loading from '../loading/Loading';
import Masonry from 'react-masonry-css'
import Fade from 'react-reveal/Fade';
import Selector from '../../containers/SelectorContainer'



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1, // 目前的頁碼
      hoveredImg: '',
      previewId:'',
      // createName:'',
      // editMode: false,
      searchTxt: this.props.match.params.query === undefined ? '' : this.props.match.params.query,
    };
  }

  componentDidMount() {
    const { getImgsList,query,getRandomImgs, getSynonymList,initImgs,showTopSearch} = this.props;
    const { page} = this.state;
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', this.handleLoandMore);
    showTopSearch(false);

    if(this.props.match.params.query !== undefined) { //依照關鍵字搜尋
      initImgs([])
      query(this.props.match.params.query)
      getSynonymList(this.props.match.params.query)
      getImgsList(page, this.props.match.params.query);
    } else { //隨機搜尋
      query('')
      initImgs([])
      getRandomImgs(page)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('scroll', this.handleLoandMore);
  }

  componentDidUpdate(prevProps,prevState) {
    const { isLoadingSaveImg,getImgsList,query, getSynonymList,initImgs} = this.props;
    const { page,searchTxt } = this.state;

    if (prevProps.isLoadingSaveImg === true && isLoadingSaveImg === false) {
      this.setState({
        showSelector:false,
      })
      document.body.style.overflow = "visible"
    }
    if (prevState.searchTxt !== searchTxt) {
      initImgs([])
      query(searchTxt)
      getSynonymList(searchTxt) //找同義詞
      getImgsList(page, searchTxt);
    }
  }

  handleSearchTxt = (item) => {
    this.setState({
      searchTxt: item,
    })
  }

  handleScroll = () => {
    // topSearchBar
    const { showTopSearch } = this.props
    if( document.documentElement.scrollTop > 250) {
      showTopSearch(true);
    } else {
      showTopSearch(false);
    }
    // 下拉加載
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollHeight-clientHeight === scrollTop) {
      const { page } = this.state;
      const { getImgsList,queryTxt,getRandomImgs,totalPage,isLoadingRandomImgs,isLoadingGetImgs } = this.props;
      if(totalPage !== 0 && page !== totalPage){
        if(queryTxt === ''){
          if(!isLoadingRandomImgs){
            getRandomImgs(page + 1)
            this.setState((prevState) => ({
              page: prevState.page + 1,
            }));
          }
        } else {
          if(!isLoadingGetImgs){
            getImgsList(page + 1, queryTxt);
            this.setState((prevState) => ({
              page: prevState.page + 1,
            }));
          }
        }
      }
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

  handleSelector(id){
    this.setState({
      previewId: id,
      showSelector: true,
    })
    document.body.style.overflow = "hidden"
    // alert('ok')
  }

  handleClose = () => {
    this.setState({
      showSelector:false,
    })
    document.body.style.overflow = "visible"
  }

  render() {
    
    const { page,previewId,showSelector,hoveredImg } = this.state;
    const { history, imgs, isLoadingGetImgs,query,queryTxt,getImgsList,initImgs, isLoadingRandomImgs,syn,isLoadingSynonym, getSynonymList, isAuthenticated,totalPage} = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    return (
      <Fragment>
        <div className="container" >
          {showSelector && <Selector showSelector = {true}  previewId={previewId} 
          handleClose={this.handleClose}/>}

          <Search query={query} queryTxt={queryTxt} getImgsList={getImgsList} page={page} initImgs={initImgs} history={history} syn={syn} isLoadingSynonym={isLoadingSynonym} getSynonymList={getSynonymList}
          handleSearchTxt={this.handleSearchTxt}
          />
          {isLoadingGetImgs ? <Loading /> :
          <ul>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {imgs.map((item, index) => {
                  if (index > 0 && imgs[index]) {
                    return (
                      <div className="outter"                           
                      onMouseOver={() => this.handleHoverOver(imgs[index].id)}
                      onMouseOut={this.handleHoverOut}>
                        <button className={hoveredImg === imgs[index].id? 'save_button':'hide_style'} 
                        onClick={isAuthenticated ? () => this.handleSelector(imgs[index].id) : ()=> history.push('/login')}><i class="fas fa-plus"></i></button>
                        <Fade bottom duration={600} >
                          <li key={imgs[index].id} role="presentation" 
                          onClick={() => history.push(`/images/${imgs[index].id}`)}>
                            <div className={hoveredImg === imgs[index].id? 'hover_layer':'hide_style'}></div>
                            <img src={imgs[index].urls.regular} alt="" />
                          </li>
                        </Fade>
                      </div>
                    );
                  }
                })
              }
            </Masonry>
            {totalPage === 0 && <div className="empt_notice">No results found, please try different keyword.</div>}
            {page === totalPage && <div className="empt_notice">{`${page} / ${totalPage}`}</div>}
          </ul>
          }
        </div>
      </Fragment>
    );
  }
}
export default Home;
