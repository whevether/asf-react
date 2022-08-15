import * as types from 'constants/types';
export const fetchTranslateList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/translate/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_POST_LIST,
    payload: res
  });
};
// 添加岗位
export const createTranslate = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/translate/create',params);
  return res?.result;
};
//修改岗位
export const modifyTranslate = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/translate/modify',params);
  return res?.result;
};
// 岗位详情
export const detailsTranslate = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/translate/details',{
    params: params
  });
  return res?.result;
};
// 删除岗位
export const deleteTranslate = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/translate/delete/${id}`);
  return res?.result;
};