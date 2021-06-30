import * as types from 'constants/types';
//获取中心端账户列表
export const getCenterAccountList = (params)=>async(dispatch,getState,api)=>{
  const res = await api.get('/asf/center/getaccountlist',{
    params: params
  });
  dispatch({
    type: types.GET_CENTER_ACCOUNT_LIST,
    payload: res
  });
};