import * as types from 'constants/types';
// 获取富文本列表
export const getEditorList = () => async (dispatch,getState,api)=>{
  const res = await api.get('/asf/editor/getlists');
  dispatch({
    type: types.GET_EDITOR_LIST,
    payload: res?.result
  });
};