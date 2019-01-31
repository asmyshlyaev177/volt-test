import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';

const isDev = process.env.NODE_ENV === 'development';

const configureStore = (state = undefined) => {
  const middlewares = applyMiddleware(thunk);
  const middlewaresAndExt = isDev
    ? composeWithDevTools(middlewares)
    : middlewares;
  const store = createStore(reducer, state, middlewaresAndExt);

  if (module.hot) {
    module.hot.accept(undefined, () => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
};

export default configureStore;
