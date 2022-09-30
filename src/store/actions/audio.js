import * as types from 'constants/types';
// 获取权限列表
export const fetchAudioList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/audio/getloglist',{
    params: params
  });
  dispatch({
    type: types.GET_AUDIO_LIST,
    payload: res
  });
};
// 删除日志
export const deleteAudio = (data) => async (dispatch,getState,api)=> {
  const res = await api.post(`/asf/audio/deletelog`,data);
  return res;
};