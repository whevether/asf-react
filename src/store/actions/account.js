import * as types from 'constants/types';
// 获取账户列表
export const fetchAccountList = (params) => async (dispatch,getState,api)=> {
  const res = await api.get('/asf/account/getlist',{
    params: params
  });
  dispatch({
    type: types.GET_ACCOUNT_LIST,
    payload: res
  });
  return res;
};
// 创建账户
export const createAccount = (params) => async(dispatch,getState,api) => {
  const res = await api.post('/asf/account/create',params);
  return res?.data;
};
// 编辑账户
export const modifyAccount = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/account/modify',params);
  return res?.data;
};
// 获取账户详情
export const getAccountDetails = (params)=>async(dispatch,getState,api) => {
  const res = await api.get('/asf/account/details',{
    params:params
  });
  return res?.data;
};
//软删除账户
export const deleteAccount = (id) => async(dispatch,getState,api) => {
  const res = await api.post(`/asf/account/delete/${id}`,{});
  return res?.data;
};
//修改账户状态
export const modifyAccountStatus = (params) => async(dispatch,getState,api)=>{
  const res = await api.put('/asf/account/modifyStatus',params);
  return res?.data;
};
//重置账户密码
export const resetAccountPassword = (params) => async(dispatch,getState,api)=>{
  const res = await api.put('/asf/account/resetPassword',params);
  return res?.data;
};
// 修改邮箱
export const modifyAccountEmail = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/account/modifyEmail',params);
  return res?.data;
};
// 修改手机号码
export const modifyAccountTelPhone = (params) => async (dispatch,getState,api) => {
  const res = await api.put('/asf/account/modifyTelPhone',params);
  return res?.data;
};
//修改用户头像
export const modifyAccountAvatar = (params) => async(dispatch,getState,api)=>{
  const res = await api.put('/asf/account/modifyAvatar',params);
  return res?.data;
};
//账户分配角色
export const assignAccountRole = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/account/assignRole',params);
  return res?.data;
};
// 账户分配部门
export const assignAccountDepartment = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/account/assignDepartment',params);
  return res?.data;
};
// 分配账户岗位
export const assignAccountPost = (params) => async(dispatch,getState,api) => {
  const res = await api.put('/asf/account/assignPost',params);
  return res?.data;
};