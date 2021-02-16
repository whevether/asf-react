import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {axiosInstance} from 'utils/request';
import {removeCookie} from 'utils/storage';
import {notification} from 'antd';
export default function configureStore(history,initialState) {
  axiosInstance.interceptors.request.use((config) => {
    return config;
  },(error) =>{
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response)=>{
    if(response.status === 200 && (response?.data?.status === 200 || response?.data?.status === 0)){
      return response?.data?.result;
    }else{
      notification['error']({
        message: response?.data.message
      });
      return Promise.reject(response?.data);
    }
  },(err)=>{
    const {response} = err;
    if([401,403].indexOf(response?.status) > -1){
      notification['error']({
        message: '请求错误',
        description:
          '没有权限'
      });
      removeCookie(['token','refreshToken']);
      setTimeout(() => {
        history.push('/login');
      },500);
    }
    if([400].indexOf(response?.status) > -1){
      notification['error']({
        message: '请求错误',
        description:
          response?.data.message
      });
    }
    if([500].indexOf(response?.status) > -1){
      notification['error']({
        message: '请求错误',
        description:
          '服务器错误'
      });
      setTimeout(() => {
        history.push('/404');
      },1500);
    }
    if([404].indexOf(response?.status) > -1){
      notification['error']({
        message: '请求错误',
        description:
          '没有这个接口'
      });
    }
    return Promise.reject(err);
  });
  const middlewares = [
    thunkMiddleware.withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
