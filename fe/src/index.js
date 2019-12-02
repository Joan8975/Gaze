import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import App from './containers/AppContainer';
import navReducer from './reducer';
import fieldReducer from './reducer';
import postsReducer from './reducer';
import fbConfig from './config/fbConfig'

const reducers = combineReducers({
  nav: navReducer,
  posts: postsReducer,
});

const store = createStore(reducers,applyMiddleware(promise));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
