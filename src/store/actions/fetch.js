import * as types from 'constants/types';
// 获取用户信息
export const fetchUserInfo = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/asf/account/accountinfo');
  dispatch({
    type: types.FETCH_USER_DATA,
    payload: res?.result
  });
};
export const toggleMenu = () => (dispatch)=>{
  dispatch({
    type: types.TOGGLE_MENU
  });
};
