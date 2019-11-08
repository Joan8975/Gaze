import * as actionTypes from './actionTypes';
import * as WebAPI from './WebAPI';

export const updateNav = (text) => {
  return {
    type: actionTypes.UPDATE_NAV,
    value: text,
  };
};

export const fieldInvalid = (array) => {
  return {
    type: actionTypes.FIELD_INVALID,
    value: array,
  };
};
export const fieldAuthor = (text) => {
  return {
    type: actionTypes.FIELD_AUTHOR,
    value: text,
  };
};
export const fieldTitle = (text) => {
  return {
    type: actionTypes.FIELD_TITLE,
    value: text,
  };
};
export const fieldBody = (text) => {
  return {
    type: actionTypes.FIELD_BODY,
    value: text,
  };
};

export const getPostList = () => {
  return {
    type: actionTypes.GET_POSTS,
    payload: WebAPI.getPosts(),
  };
};





export const query = text => {
  return {
    type: actionTypes.QUERY,
    value: text,
  }
}

export const initImgs = array => {
  return {
    type: actionTypes.INIT_IMGS,
    value: array,
  };
};

export const getImgsList = (page,query) => {
  return {
    type: actionTypes.GET_IMGS,
    payload: WebAPI.getImgs(page,query),
  };
};

export const getRandomImgs = (page) => {
  return {
    type: actionTypes.GET_RANDOM_IMGS,
    payload: WebAPI.randomImgs(page),
  };
};

export const getSynonymList = (word) => {
  return {
    type: actionTypes.GET_SYNNONYM,
    payload: WebAPI.getSynonym(word),
  };
};

export const showTopSearch = boolean => {
  return {
    type: actionTypes.SHOW_TOP_SEARCH,
    value: boolean
  }
}


export const getSinglePost = (postId) => {
  return {
    type: actionTypes.GET_SINGLE_POST,
    payload: WebAPI.singlePost(postId),
  };
};

export const getUpdatePost = (postId, author, title, body) => {
  return {
    type: actionTypes.GET_UPDATE_POST,
    payload: WebAPI.updatePost(postId, author, title, body),
  };
};

export const getDeletePost = (postId) => {
  return {
    type: actionTypes.GET_DELETE_POST,
    payload: WebAPI.deletePost(postId),
  };
};

export const getCreatePost = (author, title, body) => {
  return {
    type: actionTypes.GET_CREATE_POST,
    payload: WebAPI.createPost(author, title, body),
  };
};
