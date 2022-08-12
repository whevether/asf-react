import * as types from 'constants/types';
export const fetchRoleList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/role/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_ROLE_LIST,
    payload: res
  });
};
// 添加角色
export const createRole = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/role/create',params);
  return res?.result;
};
//修改角色
export const modifyRole = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/role/modify',params);
  return res?.result;
};
//修改角色状态
export const modifyStatus = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/role/modifyStatus',params);
  return res?.result;
};
// 角色详情
export const detailsRole = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/role/details',{
    params: params
  });
  return res?.result;
};
// 删除角色
export const deleteRole = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/role/delete/${id}`);
  return res?.result;
};
//分配角色权限
export const assignPermission = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/role/assignPermission',params);
  return res?.result;
};