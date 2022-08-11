import * as types from 'constants/types';
// 获取权限列表
export const fetchPermissionList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/permission/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_PEERMISSION_LIST,
    payload: res
  });
  return res?.result;
};
// 创建权限
export const createPermission = (data) => async (dispatch,getState,api)=> {
  const res = await api.post('/asf/permission/create',data);
  return res?.result;
};
// 修改权限
export const modifyPermission = (data) => async (dispatch,getState,api)=> {
  const res = await api.post('/asf/permission/modify',data);
  return res?.result;
};
//删除权限
export const deletePermission = (id) => async (dispatch,getState,api)=> {
  const res = await api.post(`/asf/permission/delete/${id}`);
  return res?.result;
};

//获取权限详情
export const detailsPermission = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/permission/details',{
    params: params
  });
  return res?.result;
};

