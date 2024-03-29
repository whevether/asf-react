import * as types from 'constants/types';
export const fetchTenancyList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/tenancy/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_TENANCY_LIST,
    payload: res
  });
};
// 添加租户
export const createTenancy = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/tenancy/create',params);
  return res?.result;
};
//修改租户
export const modifyTenancy = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/tenancy/modify',params);
  return res?.result;
};
// 租户详情
export const detailsTenancy = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/tenancy/details',{
    params: params
  });
  return res?.result;
};
// 删除租户
export const deleteTenancy = (data) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/tenancy/delete`,data);
  return res?.result;
};