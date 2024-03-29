import * as types from 'constants/types';
export const fetchApiList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/api/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_API_LIST,
    payload: res
  });
};
// 添加api
export const createApi = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/api/create',params);
  return res?.result;
};
//修改api
export const modifyApi = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/api/modify',params);
  return res?.result;
};
//修改api
export const modifyStatus = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/api/modifyStatus',params);
  return res?.result;
};
// api详情
export const detailsApi = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/api/details',{
    params: params
  });
  return res?.result;
};
// 删除api
export const deleteApi = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/api/delete/${id}`);
  return res?.result;
};