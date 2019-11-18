import * as actionTypes from './actionTypes';

const state = {
  navText: '/',
  invalidInput: [],
  author: '',
  title: '',
  body: '',
  imgs: [],
  isLoadingGetImgs: false,
  isLoadingRandomImgs: false,
  queryTxt: '',
  isLoadingSynonym: false,
  syn:[],
  topSearch: false,
  singleImg: '',
  isLoadingSingleImg: false,
  isLoadingLogIn: false,
  response: '',
  authError: null,
  isAuthenticated: false,
  allCollections:[],
  isLoadingAllCollections: false,





  posts: [],
  isLoadingGetPosts: false,
  totalPage: '',
  singlePost: [],
  isLoadingSinglePost: false,
  isLoadingUpdatePost: false,
  isLoadingDeletePost: false,
  isLoadingCreatePost: false,
};

function reducer(globalState = state, action) {
  console.log(action);
  
  switch (action.type) {
    case actionTypes.UPDATE_NAV:
      return {
        ...globalState,
        navText: action.value,
      };
    case actionTypes.FIELD_INVALID:
      return {
        ...globalState,
        invalidInput: action.value,
      };
    case actionTypes.FIELD_AUTHOR:
      return {
        ...globalState,
        author: action.value,
      };
    case actionTypes.FIELD_TITLE:
      return {
        ...globalState,
        title: action.value,
      };
    case actionTypes.FIELD_BODY:
      return {
        ...globalState,
        body: action.value,
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
        syn: action.payload.noun.syn,
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
    

  















    case actionTypes.GET_POSTS_PENDING:
      return {
        ...globalState,
        isLoadingGetPosts: true,
      };
    case actionTypes.GET_POSTS_FULFILLED:
      return {
        ...globalState,
        isLoadingGetPosts: false,
        posts: action.payload.data,
        // totalPage: Math.ceil(action.payload.data.length / 9),
      };
    case actionTypes.GET_UPDATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingUpdatePost: true,
      };
    case actionTypes.GET_UPDATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingUpdatePost: false,
      };
    case actionTypes.GET_DELETE_POST_PENDING:
      return {
        ...globalState,
        isLoadingDeletePost: true,
      };
    case actionTypes.GET_DELETE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingDeletePost: false,
      };
    case actionTypes.GET_CREATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingCreatePost: true,
      };
    case actionTypes.GET_CREATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingCreatePost: false,
      };
    default:
      return globalState;
  }
}

export default reducer;
