import axios from 'axios';
import { removeCookie } from 'utils/storage';
import { notification } from 'antd';
import * as types from 'constants/types';
import { aesEncrypt, aesDecrypt, isAesEnabled } from 'utils/aes';
import { router } from 'router/routes';


// Webpack 通过 DefinePlugin 注入 __VITE_APP_API_BASE_URL__；Vite 从 .env 注入 import.meta.env.VITE_APP_API_BASE_URL
const apiBaseURL =
  (typeof __VITE_APP_API_BASE_URL__ !== "undefined" ? __VITE_APP_API_BASE_URL__ : "") ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_APP_API_BASE_URL) ||
  "/api";

export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000
});

//设置 token api 请求头
export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/** 将 params 对象序列化为 query 字符串（不含前导 ?） */
function paramsToQuery(params) {
  const search = new URLSearchParams();
  Object.keys(params || {}).forEach((k) => {
    const v = params[k];
    if (v !== undefined && v !== null && v !== '') search.set(k, String(v));
  });
  const s = search.toString();
  return s ? `?${s}` : '';
}

export const request = (store) => {
  let pendingCount = 0;

  axiosInstance.interceptors.request.use((config) => {
    pendingCount += 1;
    if (pendingCount === 1) {
      store.dispatch({
        type: types.LOAD,
        payload: true
      });
    }

    // 统一 AES 加密请求：data / params（与后端 ECB + PKCS7 约定一致）
    if (isAesEnabled()) {
      // GET：加密 query，以 params 参数传递
      if (config.params && Object.keys(config.params).length > 0) {
        const queryStr = paramsToQuery(config.params);
        const encrypted = aesEncrypt(queryStr);
        config.params = { params: encrypted };
      }
      // POST/PUT/PATCH body：加密后放在 data 字段（排除 FormData/文件上传）
      if (config.data != null && typeof FormData !== 'undefined' && !(config.data instanceof FormData)) {
        const raw = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
        const encrypted = aesEncrypt(raw);
        config.data = JSON.stringify({ data: encrypted });
        if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  }, (error) => {
    pendingCount = Math.max(0, pendingCount - 1);
    if (pendingCount === 0) {
      store.dispatch({
        type: types.LOAD,
        payload: false
      });
    }
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response) => {
    // 统一 AES 解密响应体（后端返回 Base64 密文）
    if (isAesEnabled() && typeof response?.data === 'string' && response.data) {
      try {
        const decrypted = aesDecrypt(response.data);
        if (decrypted) response.data = JSON.parse(decrypted);
      } catch {
        // 解密或解析失败则保持原 response.data
      }
    }

    const clearLoad = () => {
      pendingCount = Math.max(0, pendingCount - 1);
      if (pendingCount === 0) {
        store.dispatch({ type: types.LOAD, payload: false });
      }
    };

    if (response.status === 200 && (response?.data?.status === 200 || response?.data?.status === 0)) {
      clearLoad();
      return response?.data;
    } else {
      clearLoad();
      notification['error']({
        message: response?.data?.message
      });
      return Promise.reject(response?.data);
    }
  }, (err) => {
    const { response } = err;
    // 错误响应也可能是 AES 加密的
    if (response?.data && isAesEnabled() && typeof response.data === 'string') {
      try {
        const decrypted = aesDecrypt(response.data);
        if (decrypted) response.data = JSON.parse(decrypted);
      } catch {}
    }
    if ([401, 403].indexOf(response?.status) > -1) {
      notification['error']({
        message: '系统提示',
        description: '请重新登录'
      });
      removeCookie(['token', 'refreshToken']);
      setToken('');
      store.dispatch({
        type: types.FETCH_USER_DATA,
        payload: null
      });
      router.navigate('/login');
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
    pendingCount = Math.max(0, pendingCount - 1);
    if (pendingCount === 0) {
      store.dispatch({ type: types.LOAD, payload: false });
    }
    return Promise.reject(err);
  });
  // return axiosInstance;
};