import * as types from 'constants/types';
// 获取租户列表集合
export const fetchTenancyList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/Tenancy/getLists');
  dispatch({
    type: types.FETCH_TENANCY_LIST_DATA,
    payload: res?.result
  });
};
// 获取部门列表
export const getDepartmentList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/department/getLists');
  return res?.result;
};
// 获取用户信息
export const fetchUserInfo = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/account/accountinfo');
  dispatch({
    type: types.FETCH_USER_DATA,
    payload: res?.result
  });
};
// 切换菜单
export const toggleMenu = () => (dispatch)=>{
  dispatch({
    type: types.TOGGLE_MENU
  });
};