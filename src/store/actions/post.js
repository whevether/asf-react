import * as types from 'constants/types';
export const fetchPostList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/post/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_POST_LIST,
    payload: res
  });
};
// 添加岗位
export const createPost = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/post/create',params);
  return res?.result;
};
//修改岗位
export const modifyPost = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/post/modify',params);
  return res?.result;
};
// 岗位详情
export const detailsPost = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/post/details',{
    params: params
  });
  return res?.result;
};
// 删除岗位
export const deletePost = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/post/delete/${id}`);
  return res?.result;
};