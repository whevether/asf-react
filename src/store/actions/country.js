import * as types from 'constants/types';
export const fetchCountryList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/country/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_COUNTRY_LIST,
    payload: res
  });
};
// 添加国家
export const createCountry = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/country/create',params);
  return res?.result;
};
//修改国家
export const modifyCountry = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/country/modify',params);
  return res?.result;
};
// 国家详情
export const detailsCountry = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/country/details',{
    params: params
  });
  return res?.result;
};
// 删除国家
export const deleteCountry = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/country/delete/${id}`);
  return res?.result;
};