import Cookies from 'js-cookie';
import {notification} from 'antd';
import * as dayjs from 'dayjs';
/*
获取/设置cookie/移除coolkie
*/
export const getCookie = (name)=>{
  try{
    if (typeof name === 'string') {
      return Cookies.get(name);
    }
  }catch(err){
    notification.open({
      message: 'cookie错误',
      description:
        '获取cookie失败'
    });
  }
};
//设置cookie
export const setCookie = (name, value, domain)=>{
  try{
    if(typeof name === 'string' && value){
      return Cookies.set(name,value,{path: '/', domain: domain});
    }
  }catch(err){
    notification.open({
      message: 'cookie错误',
      description:
        '设置cookie失败'
    });
  }
};
// 移除 cookie
export const removeCookie = (arr, domain)=>{
  try{
    if (Array.isArray(arr)) {
      for(let value of arr){
        Cookies.remove(value,{domain: domain});
      }
    }
  }catch(err){
    notification.open({
      message: 'cookie错误',
      description:
        '删除cookie失败'
    });
  }
};
// 时间戳转时间
export const timeToDate = (date,params) => {
  return dayjs.unix(date).format(params);
};