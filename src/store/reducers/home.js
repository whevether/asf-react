import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  collapsed: false,
  loading: false
};
export default function home(state=initData,action){
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
    default: 
      return state;
  }
}