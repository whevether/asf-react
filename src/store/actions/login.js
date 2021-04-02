import * as types from 'constants/types';
// 获取租户列表集合
export const fetchTenancyList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/Tenancy/getLists');
  dispatch({
    type: types.FETCH_TENANCY_LIST_DATA,
    payload: res?.result
  });
};
// 登录账户获取到授权token
export const loginUser = (params)=> async (dispatch,getState,api)=>{
  const res = await api.post('/asf/authorise/login',params);
  return res?.result;
};