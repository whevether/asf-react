import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {request,axiosInstance} from 'utils/request';
import { createReduxHistoryContext } from "redux-first-history";
export default function configureStore(history,initialState) {
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
    history: history,
    //other options if needed 
  });
  const middlewares = [
    routerMiddleware,
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer(routerReducer), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  if(process.env.BUILD_TYPE === 'webpack'){
    if(module.hot){
      // Enable Webpack hot module replacement for reducers
      module?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }else{
    if (import.meta?.hot) {
      // Enable Webpack hot module replacement for reducers
      import.meta?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }
  const h = createReduxHistory(store);
  request(h,store);
  return {
    store,
    h
  };
}