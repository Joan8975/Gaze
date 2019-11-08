/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './Home.css';
import Search from '../search/Search'
import Loading from '../loading/Loading';
import Masonry from 'react-masonry-css'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
    };
    const { initImgs } = this.props;
    initImgs([])
    
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const { getImgsList, totalPage,query,getRandomImgs, getSynonymList} = this.props;
    const { page } = this.state;
    if(this.props.match.params.query !== undefined) {
      query(this.props.match.params.query)
      getSynonymList(this.props.match.params.query)
      getImgsList(page, this.props.match.params.query);
    } else {
      query('')
      getRandomImgs(page)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prepProps) {
    const { isLoadingGetImgs, totalPage, isLoadingRandomImgs } = this.props;
    const { page } = this.state;
    if (prepProps.isLoadingGetImgs === true && isLoadingGetImgs === false) {
      this.setState({
        hasMore: !(page === totalPage || totalPage === 0),
      });
    }
    if (prepProps.isLoadingRandomImgs === true && isLoadingRandomImgs === false) {
      this.setState({
        hasMore: !(page === totalPage || totalPage === 0),
      });
    }
  }

  handleLoad = () => {
    const { page } = this.state;
    const { getImgsList, totalPage,queryTxt,getRandomImgs } = this.props;
    this.setState((prevState) => ({
      page: prevState.page + 1,
      hasMore: !(prevState.page + 1 === totalPage),
    }));
    if(queryTxt === ''){
      getRandomImgs(page + 1)
    } else {
      getImgsList(page + 1, queryTxt);
    }
  }

  handleScroll = e => {
    const { showTopSearch } = this.props
    if(document.documentElement.scrollTop > 250) {
      showTopSearch(true);
    } else {
      showTopSearch(false);
    }
  }

  render() {
    const { page, hasMore } = this.state;
    const { history, imgs, isLoadingGetImgs,query,queryTxt,getImgsList,initImgs, isLoadingRandomImgs,syn,isLoadingSynonym, getSynonymList} = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    // console.log(imgs);
    return (
      <div className="container">
        <Search query={query} queryTxt={queryTxt} getImgsList={getImgsList} page={page} initImgs={initImgs} history={history} syn={syn} isLoadingSynonym={isLoadingSynonym} getSynonymList={getSynonymList}
        onScroll={this.handleScroll}
        />
        <ul>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          > 
            {(!isLoadingGetImgs || !isLoadingRandomImgs)
              ? imgs.map((post, index) => {
                if (index < page * 9 && imgs[index]) {
                  const singlePage = Math.floor(index / 9) + 1;
                  const singleIndex = index - (9 * (singlePage - 1));
                  return (
                    <Fragment key={imgs.id}>
                      <li role="presentation" onClick={() => history.push(`/posts/${post.id}#${singlePage}#${singleIndex}`)}>
                        <div className="preview">
                          <img src={imgs[index].urls.regular} alt="" />
                        </div>
                      </li>
                    </Fragment>
                  );
                }
              })
              : <Loading />}
          </Masonry>
          {hasMore ? <button type="submit" className="common_button mid_button" onClick={this.handleLoad}>Load More</button> : <div className="clearfix" />}
          <div className="clearfix" />
        </ul>
      </div>
    );
  }
}
export default Home;
