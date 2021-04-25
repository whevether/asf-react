import * as types from 'constants/types';
// 获取权限列表
export const fetchPermissionList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/permission/getlist',params);
  dispatch({
    type: types.GET_PEERMISSION_LIST,
    payload: res
  });
};