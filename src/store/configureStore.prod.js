import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {request,axiosInstance} from 'utils/request';
import { routerMiddleware } from 'connected-react-router';
export default function configureStore(history,initialState) {
  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument(axiosInstance)
  ];
  const store = createStore(rootReducer(history), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  request(history,store);
  return store;
}
