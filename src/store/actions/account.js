import * as types from 'constants/types';
// 获取账户列表
export const fetchAccountList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/account/getlist',params);
  dispatch({
    type: types.GET_ACCOUNT_LIST,
    payload: res
  });
};
// 获取部门列表
export const getDepartmentList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/department/getLists');
  return res?.result;
};