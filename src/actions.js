import * as actionTypes from './actionTypes';
import * as WebAPI from './WebAPI';

export const updateNav = (text) => {
  return {
    type: actionTypes.UPDATE_NAV,
    value: text,
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

export const getSingleImg = (imgId) => {
  return {
    type: actionTypes.GET_SINGLE_IMG,
    payload: WebAPI.singleImg(imgId),
  };
};

export const checkLogin = (boolean) =>  {
  return {
    type: actionTypes.IS_LOGGEDIN,
    value: boolean
  }
}
export const getAllCollections = (email) => {
  return {
    type: actionTypes.ALL_COLLECTIONS,
    payload: WebAPI.allCollections(email),
  };
};
export const saveNewImg = (newSave) => {
  return {
    type: actionTypes.SAVE_IMG,
    payload: WebAPI.postImg(newSave),
  };
}
export const getAllSaves = (email) => {
  return {
    type: actionTypes.ALL_SAVES,
    payload: WebAPI.allSaves(email),
  };
}
export const deleteSingleSave = (deleteSave) => {
  return {
    type: actionTypes.DELETE_SAVE,
    payload: WebAPI.deleteSave(deleteSave),
  };
}
export const getCollectionSaves = (email,collection) => {
  return {
    type: actionTypes.COLLECTION_SAVES,
    payload: WebAPI.collectionSaves(email,collection),
  };
}
export const getPreviewImg = (imgId) => {
  return {
    type: actionTypes.GET_PREVIEW_IMG,
    payload: WebAPI.singleImg(imgId),
  };
};
export const deleteSingleCollection = (deleteCollection) => {
  return {
    type: actionTypes.DELETE_COLLECTION,
    payload: WebAPI.deleteCollection(deleteCollection),
  };
}








