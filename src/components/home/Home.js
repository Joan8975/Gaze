/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './Home.css';
import Search from '../search/Search'
import Loading from '../loading/Loading';
import Masonry from 'react-masonry-css'
import Fade from 'react-reveal/Fade';
import firebase from 'firebase';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
      // isLoggedIn: false 
    };
    const { initImgs } = this.props;
    initImgs([])
  }

  componentDidMount() {
    
    const { getImgsList,query,getRandomImgs, getSynonymList} = this.props;
    const { page } = this.state;
    window.addEventListener('scroll', this.handleScroll);

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

  componentDidUpdate(prepProps,prevState) {
    const { isLoadingGetImgs, totalPage, isLoadingRandomImgs, isAuthenticated } = this.props;
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
    const { history, imgs, isLoadingGetImgs,query,queryTxt,getImgsList,initImgs, isLoadingRandomImgs,syn,isLoadingSynonym, getSynonymList, isAuthenticated} = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };
    return (
      <Fragment>
        {isAuthenticated ?
        <div className="container">
          <Search query={query} queryTxt={queryTxt} getImgsList={getImgsList} page={page} initImgs={initImgs} history={history} syn={syn} isLoadingSynonym={isLoadingSynonym} getSynonymList={getSynonymList}
          onScroll={this.handleScroll}
          />
          <p>hi! {isAuthenticated && firebase.auth().currentUser.displayName}</p>
          <ul>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {(!isLoadingGetImgs || !isLoadingRandomImgs)
                ? imgs.map((item, index) => {
                  if (index < page * 9 && imgs[index]) {
                    // const singlePage = Math.floor(index / 9) + 1;
                    // const singleIndex = index - (9 * (singlePage - 1));
                    return (
                      <Fragment>
                        <Fade bottom duration={600} >
                          <li key={imgs[index].id} role="presentation" onClick={() => history.push(`/images/${imgs[index].id}`)}>
                            <div className="preview">
                              <img src={imgs[index].urls.regular} alt="" />
                            </div>
                          </li>
                        </Fade>
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
        : <Loading />}
      </Fragment>
    );
  }
}
export default Home;
