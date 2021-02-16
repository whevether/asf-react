import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';
import {notification} from 'antd';
export default function configureStore(history,initialState) {
  const axiosInstance = axios.create({
    baseURL: '/api'
  });
  axiosInstance.interceptors.request.use((config) => {
    return config;
  },(error) =>{
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response)=>{
    if(response.status === 200 && (response?.data?.status === 200 || response?.data?.status === 0)){
      return response?.data?.result;
    }
  },(err)=>{
    const {response} = err;
    if([401,400,403].indexOf(response?.status) > -1){
      notification.open({
        message: 'Notification Title',
        description:
          '没有权限'
      });
    }
    if([500].indexOf(response?.status) > -1){
      notification.open({
        message: 'Notification Title',
        description:
          '服务器错误'
      });
      setTimeout(() => {
        history.push('/404');
      },1500);
    }
    if([404].indexOf(response?.status) > -1){
      notification.open({
        message: 'Notification Title',
        description:
          '没有这个接口'
      });
    }
    if(response.data){
      notification.open({
        message: 'Notification Title',
        description:
          '接口错误'
      });
    }
    return Promise.reject(err);
  });
  // // 定时刷新爬虫数据
  // let time = 0;
  // try
  // {
  //   time = setInterval(()=>{
  //     axiosInstance.get('/User/WritePneumoniaData')
  //     .then(res => {
  //       console.log(res);
  //     }).catch(err=>{
  //       console.log(err);
  //       clearInterval(time);
  //     });
  //   }, 600000);
  // }catch(err)
  // {
  //   clearInterval(time);
  // }
  // end
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
