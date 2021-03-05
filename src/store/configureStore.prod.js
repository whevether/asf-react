import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {request} from 'utils/request';
import { routerMiddleware } from 'connected-react-router';
export default function configureStore(history,initialState) {
  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware.withExtraArgument(request(history))
  ];
  const store = createStore(rootReducer(history), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  return store;
}
