/* jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import './AddPost.css';

class AddPost extends Component {
  constructor(props) {
    super(props);
    const { fieldInvalid, fieldAuthor, fieldBody, fieldTitle } = this.props;
    fieldInvalid([]);
    fieldAuthor('');
    fieldBody('');
    fieldTitle('');
  }


  componentDidUpdate(prepProps) {
    const { history, isLoadingCreatePost } = this.props;
    if (prepProps.isLoadingCreatePost === true && isLoadingCreatePost === false) {
      history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 防止默認跳頁功能
    const { author, title, body, fieldInvalid, getCreatePost } = this.props;
    const newState = {
      author,
      title,
      body,
    };

    if (author && title && body !== '') {
      getCreatePost(author, title, body);
    } else {
      const invalid = [];
      Object.entries(newState).forEach(([key, value]) => {
        if (value === '') {
          invalid.push(key);
        }
      });
      fieldInvalid(invalid);
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Add Post</h3>
        <form className="post_container">
          <button type="submit" className="common_button mid_button" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
export default AddPost;
