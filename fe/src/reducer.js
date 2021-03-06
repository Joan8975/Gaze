import * as actionTypes from './actionTypes';

const state = {
  navText: '/',
  imgs: [],
  isLoadingGetImgs: false,
  isLoadingRandomImgs: false,
  queryTxt: '',
  isLoadingSynonym: false,
  syn:[],
  topSearch: true,
  singleImg: {},
  isLoadingSingleImg: false,
  isLoadingLogIn: false,
  isAuthenticated: false,
  allCollections:[],
  isLoadingAllCollections: false,
  isLoadingSaveImg: false,
  isLoadingAllSaves: false,
  allSaves:[],
  isLoadingDeleteSave: false,
  deleteSaveMsg:'',
  isLoadingCollectionSaves: false,
  collectionSaves:[],
  isLoadingPreviewImg: false,
  previewImg: {},
  isLoadingDeleteCollection: false,
};

function reducer(globalState = state, action) {
  // console.log(action);
  switch (action.type) {
    case actionTypes.UPDATE_NAV:
      return {
        ...globalState,
        navText: action.value,
      };
    case actionTypes.QUERY:
    return {
      ...globalState,
      queryTxt: action.value,
    };
    case actionTypes.INIT_IMGS:
      return {
        ...globalState,
        imgs: action.value,
      };
    case actionTypes.GET_IMGS_PENDING:
      return {
        ...globalState,
        isLoadingGetImgs: true,
      };
    case actionTypes.GET_IMGS_FULFILLED:
      return {
        ...globalState,
        isLoadingGetImgs: false,
        imgs: globalState.imgs.concat(action.payload.results),
        totalPage: action.payload.total_pages
      };
    case actionTypes.GET_RANDOM_IMGS_PENDING:
      return {
        ...globalState,
        isLoadingRandomImgs: true,
      };
    case actionTypes.GET_RANDOM_IMGS_FULFILLED:
      return {
        ...globalState,
        isLoadingRandomImgs: false,
        imgs: globalState.imgs.concat(action.payload),
        totalPage: 50
    };
    case actionTypes.GET_SYNNONYM_PENDING:
    return {
      ...globalState,
      isLoadingSynonym: true,
    };
    case actionTypes.GET_SYNNONYM_FULFILLED:
      return {
        ...globalState,
        isLoadingSynonym: false,
        syn: action.payload,
    };
    case actionTypes.SHOW_TOP_SEARCH:
      return {
        ...globalState,
        topSearch: action.value,
    };
    case actionTypes.GET_SINGLE_IMG_PENDING:
      return {
        ...globalState,
        isLoadingSingleImg: true,
    };
    case actionTypes.GET_SINGLE_IMG_FULFILLED:
      return {
        ...globalState,
        isLoadingSingleImg: false,
        singleImg: action.payload,
    };
    case actionTypes.IS_LOGGEDIN:
    return {
      ...globalState,
      isAuthenticated: action.value,
    };
    case actionTypes.ALL_COLLECTIONS_PENDING:
    return {
      ...globalState,
      isLoadingAllCollections: true,
    };
    case actionTypes.ALL_COLLECTIONS_FULFILLED:
      return {
      ...globalState,
      isLoadingAllCollections: false,
      allCollections: action.payload,
    };
    case actionTypes.SAVE_IMG_PENDING:
    return {
      ...globalState,
      isLoadingSaveImg: true,
    };
    case actionTypes.SAVE_IMG_FULFILLED:
      return {
      ...globalState,
      isLoadingSaveImg: false,
    };
    case actionTypes.ALL_SAVES_PENDING:
    return {
      ...globalState,
      isLoadingAllSaves: true,
    };
    case actionTypes.ALL_SAVES_FULFILLED:
      return {
      ...globalState,
      isLoadingAllSaves: false,
      allSaves: action.payload,
    };
    case actionTypes.DELETE_SAVE_PENDING:
    return {
      ...globalState,
      isLoadingDeleteSave: true,
    };
    case actionTypes.DELETE_SAVE_FULFILLED:
      return {
      ...globalState,
      isLoadingDeleteSave: false,
      deleteSaveMsg: action.payload,
    };
    case actionTypes.COLLECTION_SAVES_PENDING:
    return {
      ...globalState,
      isLoadingCollectionSaves: true,
    };
    case actionTypes.COLLECTION_SAVES_FULFILLED:
      return {
      ...globalState,
      isLoadingCollectionSaves: false,
      collectionSaves: action.payload,
    };
    case actionTypes.GET_PREVIEW_IMG_PENDING:
      return {
        ...globalState,
        isLoadingPreviewImg: true,
    };
    case actionTypes.GET_PREVIEW_IMG_FULFILLED:
      return {
        ...globalState,
        isLoadingPreviewImg: false,
        previewImg: action.payload,
    };
    case actionTypes.DELETE_COLLECTION_PENDING:
    return {
      ...globalState,
      isLoadingDeleteCollection: true,
    };
    case actionTypes.DELETE_COLLECTION_FULFILLED:
      return {
      ...globalState,
      isLoadingDeleteCollection: false,
    };
    default:
      return globalState;
  }
}

export default reducer;
