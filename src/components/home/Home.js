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
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
      showAddBtn: '',
      showSelector: false,
      currentImgId:'',
      createName:'',
      editMode: false,
      searchTxt: this.props.match.params.query === undefined ? '' : this.props.match.params.query,
    };
  }

  componentDidMount() {
    const { getImgsList,query,getRandomImgs, getSynonymList,initImgs} = this.props;
    const { page} = this.state;
    window.addEventListener('scroll', this.handleScroll);

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
  }

  componentDidUpdate(prevProps,prevState) {
    const { isLoadingGetImgs, totalPage, isLoadingRandomImgs, isLoadingSaveImg} = this.props;
    const { getImgsList,query, getSynonymList,initImgs} = this.props;
    const { page,searchTxt } = this.state;

    if (prevProps.isLoadingGetImgs === true && isLoadingGetImgs === false) {
      this.setState({
        hasMore: !(page === totalPage || totalPage === 0),
      });
    }
    if (prevProps.isLoadingRandomImgs === true && isLoadingRandomImgs === false) {
      this.setState({
        hasMore: !(page === totalPage || totalPage === 0),
      });
    }
    if (prevProps.isLoadingSaveImg === true && isLoadingSaveImg === false) {
      this.setState({
        showSelector:false,
        createName: '',
        editMode: false,
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

  handleScroll = e => {
    const bottomLength = document.body.clientHeight-document.documentElement.scrollTop;
    console.log(bottomLength);
    const { showTopSearch } = this.props
    if(document.documentElement.scrollTop > 250) {
      showTopSearch(true);
    } else {
      showTopSearch(false);
    }
    if (bottomLength < 500) {
      const { page,hasMore } = this.state;
      const { getImgsList,queryTxt,getRandomImgs } = this.props;
      if(hasMore){
        if(queryTxt === ''){
          getRandomImgs(page + 1)
          this.setState((prevState) => ({
            page: prevState.page + 1,
          }));
        } else {
          getImgsList(page + 1, queryTxt);
          this.setState((prevState) => ({
            page: prevState.page + 1,
          }));
        }
      }
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

  handleSelector(id){
    this.setState({
      currentImgId: id,
      showSelector: true,
    })
    document.body.style.overflow = "hidden"
    // alert('ok')
  }

  handleClose = () => {
    this.setState({
      showSelector:false,
      createName: '',
      editMode: false,
    })
    document.body.style.overflow = "visible"
  }

  handleCreate = (e) => {
    this.setState({
      createName: e.target.value
    })
  }

  handleEditMode = () => {
    this.setState({
      editMode: true,
    })
  }

  render() {
    
    const { page,hasMore,currentImgId,showSelector,showAddBtn,createName,editMode,defaultTag } = this.state;
    const { history, imgs, isLoadingGetImgs,query,queryTxt,getImgsList,initImgs, isLoadingRandomImgs,syn,isLoadingSynonym, getSynonymList, isAuthenticated,getSingleImg,singleImg,totalPage} = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    return (
      <Fragment>
        <div className="container">
          {showSelector && <Selector handleClose={this.handleClose} currentImgId={currentImgId}
          getSingleImg={getSingleImg}  singleImg={singleImg} createName={createName} handleCreate={this.handleCreate} editMode={editMode} handleEditMode={this.handleEditMode}/>}

          <Search query={query} queryTxt={queryTxt} getImgsList={getImgsList} page={page} initImgs={initImgs} history={history} syn={syn} isLoadingSynonym={isLoadingSynonym} getSynonymList={getSynonymList}
          onScroll={this.handleScroll} handleSearchTxt={this.handleSearchTxt}
          />
          <ul>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {(!isLoadingGetImgs || !isLoadingRandomImgs)
                ? imgs.map((item, index) => {
                  if (index > 1 && imgs[index]) {
                    return (
                      <div className="outter"                           
                      onMouseOver={() => this.handleHoverOver(imgs[index].id)}
                      onMouseOut={this.handleHoverOut}>
                        <button className={showAddBtn === imgs[index].id? 'save_button':'hide_style'} 
                        onClick={isAuthenticated ? () => this.handleSelector(imgs[index].id) : ()=> history.push('/login')}><i class="fas fa-plus"></i></button>
                        <Fade bottom duration={600} >
                          <li key={imgs[index].id} role="presentation" 
                          onClick={() => history.push(`/images/${imgs[index].id}`)}>
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
            {(isLoadingGetImgs || isLoadingRandomImgs) && <Loading />}
            {totalPage === 0 && <div>Keywords not found, try different </div>}
            {page === totalPage && <div>no content</div>}
          </ul>
        </div>
      </Fragment>
    );
  }
}
export default Home;
