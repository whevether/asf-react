import * as types from 'constants/types';
//获取中心端账户列表
export const getCenterList = (path,params)=>async(dispatch,getState,api)=>{
  const mapUrl = {
    '/center/account': '/asf/center/getaccountlist',
    '/center/shop': '/asf/center/getshoplist',
    '/center/program': '/asf/center/getProgramList'
  };
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
//操作账户句柄
export const handleAccount = (type,data)=>async(dispatch,getState,api)=>{
  const mapUrl = {
    'create': '/asf/center/addaccount',
    'modify': '/asf/center/modifyaccount'
  };
  const res = await api.post(mapUrl[type],data);
  return res;
};