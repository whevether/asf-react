import * as types from 'constants/types';
// 初始数据
let initData = {
  tenancyList: null
};
// 租户
export default function login(state=initData,action){
  switch(action.type){
    case types.FETCH_TENANCY_LIST_DATA:
      if(action?.payload){
        return {...state,tenancyList:action?.payload};
      }
      break;
    default: 
      return state;
  }
}