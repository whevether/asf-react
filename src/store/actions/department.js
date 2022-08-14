import * as types from 'constants/types';
export const fetchDepartmentList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/department/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_DEPARTMENT_LIST,
    payload: res
  });
};
// 添加部门
export const createDepartment = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/department/create',params);
  return res?.result;
};
//修改部门
export const modifyDepartment = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/department/modify',params);
  return res?.result;
};
// 部门详情
export const detailsDepartment = (params) => async(dispatch,getState,api) => {
  const res = await api.get('/asf/department/details',{
    params: params
  });
  return res?.result;
};
// 删除部门
export const deleteDepartment = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/department/delete/${id}`);
  return res?.result;
};
//分配角色到部门
export const assignRole = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/department/assign',params);
  return res?.result;
};