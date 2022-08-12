import * as types from 'constants/types';
export const fetchTenancyList = (params) => async (dispatch,getState,tenancy)=> {
  const res = await tenancy.get('/asf/tenancy/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_TENANCY_LIST,
    payload: res
  });
};
// 添加tenancy
export const createTenancy = (params) => async(dispatch,getState,tenancy) => {
  const res = await tenancy.post('/asf/tenancy/create',params);
  return res?.result;
};
//修改tenancy
export const modifyTenancy = (params) => async(dispatch,getState,tenancy) => {
  const res = await tenancy.put('/asf/tenancy/modify',params);
  return res?.result;
};
// tenancy详情
export const detailsTenancy = (params) => async(dispatch,getState,tenancy) => {
  const res = await tenancy.get('/asf/tenancy/details',{
    params: params
  });
  return res?.result;
};
// 删除tenancy
export const deleteTenancy = (data) => async(dispatch,getState,tenancy) => {
  const res = await tenancy.post(`/asf/tenancy/delete`,data);
  return res?.result;
};