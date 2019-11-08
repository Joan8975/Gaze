/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../loading/Loading';
import EditPost from '../editPost/EditPost';

class SinglePage extends Component {
  constructor(props) {
    super(props);
    const { editing, fieldInvalid, initImgs } = this.props;
    this.state = { editing }; // 根據不同 url path 傳來的 editinng 判斷進入單一文章頁/ 編輯模式
    initImgs([]);
    fieldInvalid([]);
  }

  componentDidMount() {
    const { getSinglePost, getImgsList } = this.props;
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    getSinglePost(postId);
    // 判斷要拿第幾頁的第幾筆 img 資料
    const {
      location: {
        hash,
      },
    } = this.props;
    // const index = hash.slice(1);
    const res = hash.replace(/#/g, ',').split(',');
    const page = res[1];
    getImgsList(page);
  }

  componentDidUpdate(prepProps) {
    const { history, isLoadingUpdatePost, isLoadingDeletePost } = this.props;
    if (prepProps.isLoadingUpdatePost === true && isLoadingUpdatePost === false) {
      history.goBack();
    }
    if (prepProps.isLoadingDeletePost === true && isLoadingDeletePost === false) {
      history.push('/');
    }
  }

  handleUpdate = (e) => {
    e.preventDefault(); // 防止默認跳頁功能
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    const { title, author, body, fieldInvalid, getUpdatePost } = this.props;
    const updateState = {
      author,
      title,
      body,
    };

    if (author && title && body !== '') {
      getUpdatePost(postId, author, title, body);
    } else {
      const invalid = [];
      Object.entries(updateState).forEach(([key, value]) => {
        if (value === '') {
          invalid.push(key);
        }
      });
      fieldInvalid(invalid);
    }
  }

  handleDelete(postId) {
    const { getDeletePost } = this.props;
    getDeletePost(postId);
  }

  render() {
    const { editing } = this.state;
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    const { history, title, author, body, imgs, isLoadingGetImgs } = this.props;
    const {
      location: {
        hash,
      },
    } = this.props;
    // const index = hash.slice(1);
    const res = hash.replace(/#/g, ',').split(',');
    const page = res[1];
    const index = res[2];

    return (
      <Fragment>
        {!editing && [!isLoadingGetImgs && imgs[index]
          ? <Fragment>
            <div className="title_group">
              <div className="subtitle">{author}</div>
              <div className="article_title">{title}</div>
            </div>
            <img className="article_img" src={imgs[index].urls.regular} alt="" />
            <div className="article_container">
              <div className="article_content">{body}</div>
              <div className="btn_controller">
                <Link className="common_button left_button" to="/">Back</Link>
                <button type="submit" className="common_button delete_button " onClick={() => this.handleDelete(postId)}>Delete</button>
                <button type="submit" className="common_button " onClick={() => history.push(`/edit/${postId}#${page}#${index}`)}>Edit</button>
              </div>
            </div>
          </Fragment>
          : <Loading />]}
        {editing
        && <EditPost page={page} index={index} handleUpdate={this.handleUpdate} />
        }
      </Fragment>
    );
  }
}
export default withRouter(SinglePage);
