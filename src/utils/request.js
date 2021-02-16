import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://asf.keep-wan.me/api' : '/api'
});
//设置 token api 请求头
export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};