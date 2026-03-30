import * as types from 'constants/types';
// 获取会员列表
export const fetchMemberList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/member/getMemberList',{
    params: params
  });
  dispatch({
    type: types.GEI_MEMBER_LIST,
    payload: res
  });
  return res;
};
// 修改会员国家
export const modifyMemberCountry = (data) => async (dispatch,getState,api)=> {
  const res = await api.put(`/asf/member/modifyMemberCountry`,data);
  return res;
};
// 获取会员相册列表
export const fetchMemberAlbumList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/member/getMemberAlbumList',{
    params: params
  });
  dispatch({
    type: types.GEI_MEMBER_ALBUM_LIST,
    payload: res
  });
  return res;
};
// 获取会员动态列表
export const fetchMemberTrendsList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/member/getMemberTrendsList',{
    params: params
  });
  dispatch({
    type: types.GEI_MEMBER_TRENDS_LIST,
    payload: res
  });
  return res;
};
// 获取会员社交列表
export const fetchMemberSocializeList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/member/getMemberSocializeList',{
    params: params
  });
  dispatch({
    type: types.GEI_MEMBER_SOCIALIZE_LIST,
    payload: res
  });
  return res;
};
// 获取会员标签列表
export const fetchMemberTagsList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/member/getTagPageList',{
    params: params
  });
  dispatch({
    type: types.GEI_MEMBER_TAGS_LIST,
    payload: res
  });
  return res;
};
// 修改会员标签
export const modifyMemberTags = (data) => async (dispatch,getState,api)=> {
  const res = await api.put(`/asf/member/modifyTags`,data);
  return res;
};
// 添加会员国家
export const addMemberTags = (data) => async (dispatch,getState,api)=> {
  const res = await api.post(`/asf/member/addTags`,data);
  return res;
};