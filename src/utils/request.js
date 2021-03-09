import axios from 'axios';
import {removeCookie} from 'utils/storage';
import {notification} from 'antd';
import * as types from 'constants/types';
export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api'
});
//设置 token api 请求头
export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const request = (history,store) => {
  axiosInstance.interceptors.request.use((config) => {
    store.dispatch({
      type: types.LOAD,
      payload: true
    });
    return config;
  },(error) =>{
    setTimeout(() => {
      store.dispatch({
        type: types.LOAD,
        payload: false
      });
    },900);
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response)=>{
    if(response.status === 200 && (response?.data?.status === 200 || response?.data?.status === 0)){
      setTimeout(() => {
        store.dispatch({
          type: types.LOAD,
          payload: false
        });
      },900);
      return response?.data;
    }else{
      setTimeout(() => {
        store.dispatch({
          type: types.LOAD,
          payload: false
        });
      },900);
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
      // window.location.href = '/login';
      history.push('/login');
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
      history.push('/500');
    }
    if([404].indexOf(response?.status) > -1){
      notification['error']({
        message: '请求错误',
        description:
          '没有这个接口'
      });
    }
    setTimeout(() => {
      store.dispatch({
        type: types.LOAD,
        payload: false
      });
    },900);
    return Promise.reject(err);
  });
  // return axiosInstance;
};