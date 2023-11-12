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
// 获取岗位列表
export const getPostList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/post/getLists');
  return res?.result;
};
// 获取角色列表
export const getRoleList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/role/getLists');
  return res?.result;
};
// 获取权限列表
export const getPermissionList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/permission/getLists');
  return res?.result;
};
// 获取国家列表
export const getCountryList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/country/getLists');
  dispatch({
    type: types.FETCH_COUNTRY_LIST_DATA,
    payload: res?.result
  });
};
// 获取多语言列表
export const getTranslatetList = (isAdmin = true) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/translate/getLists',{
    params: {isAdmin:isAdmin}
  });
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
export const toggleMenu = (collapsed = false) => (dispatch)=>{
  dispatch({
    type: types.TOGGLE_MENU,
    payload: collapsed
  });
};
//上传文件
export const upload = (data)=> async (dispatch,getState,api)=>{
  const res = await api.post('/asf/upload/index',data);
  return res?.result;
};