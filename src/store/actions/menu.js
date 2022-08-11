import * as types from 'constants/types';
export const fetchMenuList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/menu/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_MENU_LIST,
    payload: res
  });
};
// 修改是否显示菜单
export const modifyHidden = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/menu/modifyHidden',params);
  return res?.result;
};
// 添加菜单
export const createMenu = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/menu/create',params);
  return res?.result;
};
// 修改菜单
export const modifyMenu = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/menu/modify',params);
  return res?.result;
};
// 菜单详情
export const detailsMenu = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/menu/details',{
    params: params
  });
  return res?.result;
};
// 删除菜单
export const deleteMenu = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/menu/delete/${id}`);
  return res?.result;
};