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
  const h = createReduxHistory(store);
  request(h,store);
  return {
    store,
    h
  };
}
