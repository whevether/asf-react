import axios from 'axios';
import { removeCookie } from 'utils/storage';
import { notification } from 'antd';
import * as types from 'constants/types';
export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
  timeout: 15000
});
//设置 token api 请求头
export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const request = (history, store) => {
  axiosInstance.interceptors.request.use((config) => {
    store.dispatch({
      type: types.LOAD,
      payload: true
    });
    return config;
  }, (error) => {

    store.dispatch({
      type: types.LOAD,
      payload: false
    });

    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response) => {
    if (response.status === 200 && (response?.data?.status === 200 || response?.data?.status === 0)) {

      store.dispatch({
        type: types.LOAD,
        payload: false
      });

      return response?.data;
    } else {
      store.dispatch({
        type: types.LOAD,
        payload: false
      });
      notification['error']({
        message: response?.data.message
      });
      return Promise.reject(response?.data);
    }
  }, (err) => {
    const { response } = err;
    if ([401, 403].indexOf(response?.status) > -1) {
      notification['error']({
        message: '请求错误',
        description:
          '请重新登录'
      });
      removeCookie(['token', 'refreshToken']);
      setToken('');
      store.dispatch({
        type: 'FETCH_USER_DATA',
        payload: null
      });
      history.push('/login');
    }
    if ([400].indexOf(response?.status) > -1) {
      notification['error']({
        message: '请求错误',
        description:
          response?.data.message
      });
    }
    if ([500].indexOf(response?.status) > -1) {
      notification['error']({
        message: '请求错误',
        description:
          '服务器错误'
      });
    }
    if ([404].indexOf(response?.status) > -1) {
      notification['error']({
        message: '请求错误',
        description: '没有这个接口'
      });
    }
    // if (err.stack.indexOf('timeout') > -1) {
    //   notification['error']({
    //     message: '请求超时',
    //     description: '请求超时了。请检查网络或接口'
    //   });
    // }
    setTimeout(() => {
      store.dispatch({
        type: types.LOAD,
        payload: false
      });
    }, 500);
    return Promise.reject(err);
  });
  // return axiosInstance;
};