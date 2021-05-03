import * as types from 'constants/types';
// 获取富文本列表
export const getEditorList = () => async (dispatch,getState,api)=>{
  const res = await api.get('/asf/editor/getlists');
  dispatch({
    type: types.GET_EDITOR_LIST,
    payload: res?.result
  });
};
// 修改富文本
export const modifyEditor = (params) => async (dispatch,getState,api) => {
  const res = await api.put('/asf/editor/modify',params);
  return res?.result;
};