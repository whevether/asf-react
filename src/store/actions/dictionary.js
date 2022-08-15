import * as types from 'constants/types';
export const fetchDictionaryList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/dictionary/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_DICTIONARY_LIST,
    payload: res
  });
};
// 添加岗位
export const createDictionary = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/dictionary/create',params);
  return res?.result;
};
//修改岗位
export const modifyDictionary = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/dictionary/modify',params);
  return res?.result;
};
// 岗位详情
export const detailsDictionary = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/dictionary/details',{
    params: params
  });
  return res?.result;
};
// 删除岗位
export const deleteDictionary = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/dictionary/delete/${id}`);
  return res?.result;
};