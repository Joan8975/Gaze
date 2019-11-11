/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { Link, withRouter } from 'react-router-dom';
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
          ? <Fragment>
            <div className="title_group">
              <div className="subtitle">{singleImg.user.name}</div>
              {/* <div className="article_title">{title}</div> */}
            </div>
            <img className="article_img" src={singleImg.urls.regular} alt=""/>
            {/* <div className="article_container">
              <div className="article_content">{body}</div>
              <div className="btn_controller">
                <Link className="common_button left_button" to="/">Back</Link>
                <button type="submit" className="common_button delete_button " onClick={() => this.handleDelete(postId)}>Delete</button>
                <button type="submit" className="common_button " onClick={() => history.push(`/edit/${postId}#${page}#${index}`)}>Edit</button>
              </div>
            </div> */}
          </Fragment>
          : <Loading />}
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
