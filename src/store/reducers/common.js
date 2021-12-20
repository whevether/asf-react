import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  fundamentals: {
    columns: [],
    list:[]
  },
  tenancyList: null,
  collapsed: false,
  loading: false
};
export default function common(state=initData,action){
  switch(action.type){
    case types.FETCH_USER_DATA:
      if(action.payload){
        return {...state,data:action.payload};
      }
      break;
    case types.TOGGLE_MENU:
      return {...state,collapsed: !state.collapsed};
    case types.LOAD:
      return {...state,loading: action.payload};
    case types.FETCH_TENANCY_LIST_DATA:
      return {...state,tenancyList:action?.payload};
    case types.GET_FUND_LIST:
      return{...state,fundamentals: action?.payload};
    default: 
      return state;
  }
}