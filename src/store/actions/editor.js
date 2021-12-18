import * as types from 'constants/types';
// 获取富文本分页列表
export const getList = (params) => async (dispatch,getState,api)=>{
  const res = await api.get('/asf/editor/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_EDITOR_LIST,
    payload: res
  });
};
// 获取富文本标题列表
export const getEditorList = () => async (dispatch,getState,api)=>{
  const res = await api.get('/asf/editor/getlists');
  dispatch({
    type: types.GET_EDITOR_LISTTITLE,
    payload: res?.result
  });
};
// 修改富文本
export const createEditor = (params) => async (dispatch,getState,api) => {
  const res = await api.post('/asf/editor/create',params);
  return res?.result;
};
// 修改富文本
export const modifyEditor = (params) => async (dispatch,getState,api) => {
  const res = await api.put('/asf/editor/modify',params);
  return res?.result;
};
// 获取富文本内容
export const getEditor = (params)=>async(dispatch,getState,api)=>{
  const res = await api.get('/asf/editor/getEditor',{
    params: params
  });
  return res?.result;
};
