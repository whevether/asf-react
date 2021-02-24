import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  collapsed: false
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
    default: 
      return state;
  }
}