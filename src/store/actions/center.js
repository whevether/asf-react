import * as types from 'constants/types';
const mapUrl = {
  '/center/account': '/asf/center/getaccountlist',
  '/center/shop': '/asf/center/getshoplist',
  '/center/program': '/asf/center/getProgramList'
};
//获取中心端账户列表
export const getCenterList = (path,params)=>async(dispatch,getState,api)=>{
  const res = await api.get(mapUrl[path],{
    params: params
  });
  dispatch({
    type: types.GET_CENTER_LIST,
    payload: res
  });
};
//修改账户状态
export const modifyAccountStatus = (data)=>async(dispatch,getState,api)=>{
  const res = await api.put('/asf/center/modifystatus',data);
  return res;
};