import * as types from 'constants/types';
export const fetchMenuList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/menu/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_MENU_LIST,
    payload: res
  });
};