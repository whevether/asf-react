import * as types from 'constants/types';
// 获取租户列表集合
export const fetchTenancyList = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/Tenancy/GetLists');
  dispatch({
    type: types.FETCH_TENANCY_LIST_DATA,
    payload: res
  });
};